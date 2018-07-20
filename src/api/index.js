import axios from 'axios';
import api from './api';
import MintUI from 'mint-ui';
import store from '../store';

let loading = false;
let timer = null;

axios.defaults.timeout = 5000;

//添加请求拦截器
axios.interceptors.request.use(
  config => {
    loading = true;
    return config;
  },
  error => {
    loading = false;
    MintUI.Indicator.close();
    return Promise.reject(error);
  }
);

//添加响应拦截器
axios.interceptors.response.use(
  response => {
    loading = false;
    MintUI.Indicator.close();
    return response;
  },
  error => {
    loading = false;
    MintUI.Indicator.close();

    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求';
          break;
        case 401:
          error.message = '未授权，请重新登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = '请求错误,未找到该资源';
          break;
        case 405:
          error.message = '请求方法未允许';
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器端出错';
          break;
        case 501:
          error.message = '网络未实现';
          break;
        case 502:
          error.message = '网络错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网络超时';
          break;
        case 505:
          error.message = 'http版本不支持该请求';
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      error.message = '连接到服务器失败';
    }
    return Promise.resolve(error);
  }
);

//检查接口请求状态
function checkStatus(resolve, reject, response) {
  if (response && response.status === 200) {
    if (response.data.status === 10000000) {
      resolve(response.data.data);
    } else {
      MintUI.Toast(response.message);
      reject(response.message);
    }
  } else {
    MintUI.Toast(response.message);
    reject(response.message);
  }
}

let xhr = config => {
  //加载动画
  clearTimeout(timer);
  timer = setTimeout(() => {
    if (loading) {
      MintUI.Indicator.open({
        text: '加载中',
        spinnerType: 'triple-bounce'
      });
    }
  }, 2000);

  if (config instanceof Array) {
    return axios.all(config);
  } else {
    let method = config.method || 'post';
    let name = config.name;
    let data = config.data || {};

    switch (method) {
      case 'get':
        return new Promise((resolve, reject) => {
          axios
            .get(api[name].url, {
              params: data,
              headers: {}
            })
            .then(res => {
              checkStatus(resolve, reject, res);
            })
            .catch(res => {
              reject(res);
            });
        });
      case 'post':
        return new Promise((resolve, reject) => {
          axios
            .post(api[name].url, JSON.stringify(data), {
              headers: {
                'Content-Type': 'application/json; charset=UTF-8'
              }
            })
            .then(res => {
              checkStatus(resolve, reject, res);
            })
            .catch(res => {
              reject(res);
            });
        });
      default:
    }
  }
};

export { xhr, api };
