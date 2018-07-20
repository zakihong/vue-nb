import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  linkActiveClass: 'is-active',
  routes
});

router.beforeEach((option, from, next) => {
  //解决messagebox在切换路由时不取消的bug
  if (document.querySelector('.mint-msgbox-cancel')) {
    document.querySelector('.mint-msgbox-cancel').click();
  }
  return next();
});

router.afterEach(() => {});

export default router;
