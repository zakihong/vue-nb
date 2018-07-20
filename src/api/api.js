let api = {
  getDeviceInfo: { url: 'getDeviceInfo', cache: false },
  getPortSize: { url: 'getPortSize', cache: false }
};

for (var k in api) {
  let urlHost = window.htp.apihost;
  let url = api[k].url;

  if (process.env.NODE_ENV === 'development') {
    urlHost = '/proxy/';
  }
  api[k].url = urlHost + url;
}

export default api;
