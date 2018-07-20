import Vue from 'vue';
// import vueTouch from './vue-touch';

Vue.directive('focus', {
  inserted: function(el) {
    el.focus();
  }
});

// Vue.directive('touch', vueTouch);
