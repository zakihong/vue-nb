<template>
  <div class="container-wrapper">
    <transition :name="transitionName">
      <router-view class="container"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'appvue',
    data() {
      return {
        transitionName: '',
        title: ''
      };
    },
    watch: {
      '$route'(to, from) {
        if(this.isChild(from.path)) {
          this.transitionName = this.isChild(to.path) ? 'slide-left' : 'slide-right';
        } else {
          this.transitionName = this.isChild(to.path) ? 'slide-left' : '';
        }
      }
    },
    methods: {
      isChild(str) {
        return (/\/.+/).test(str);
      }
    }
  };
</script>

<style lang="less">
  @import 'swiper/dist/css/swiper.min.css';
  @import 'mint-ui/lib/style.css';
  @import './style/tool.less';
  @import './style/global.less';
  @import './style/mint-ui.less';
  .slide-left-enter,
  .slide-right-leave-active {
    -webkit-transform: translate(100%, 0);
  }
  .slide-left-leave-active,
  .slide-right-enter {
    -webkit-transform: translate(-100%, 0);
  }
  html,
  body {
    background-color: #f3f3f3;
    font-family: '苹方', '微软雅黑', '宋体';
  }

  .container-wrapper {
    height: 100%;
  }
</style>