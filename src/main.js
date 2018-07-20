import Vue from 'vue';
import MintUI from 'mint-ui';
import FastClick from 'fastclick';
import VueI18n from 'vue-i18n';
import router from './router';
import store from './store';
import components from './components';
import locales from './locales';
import filters from './filters';
import directs from './directive';
import App from './App';
import { spread } from './utils';

if (window.htp.mock) {
  require('./mock');
}

Vue.use(MintUI);
Vue.use(VueI18n);

Vue.prototype.spread = spread;

if ('addEventListener' in document) {
  document.addEventListener(
    'fastclick',
    () => {
      FastClick.attach(document.body);
    },
    false
  );
}

const messages = Object.create(null);
Object.keys(locales).forEach(i => {
  messages[i] = {
    ...locales[i]
  };
});
const i18n = new VueI18n({
  locale: store.state.lang,
  messages
});

Object.keys(components).forEach(key => {
  var name = key.replace(/(\w)/, v => v.toUpperCase());
  Vue.component(`v${name}`, components[key]);
});

new Vue({
  data: {
    eventHub: new Vue() //事件中心
  },
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
