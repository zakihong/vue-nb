(function(doc, win) {
  //计算根节点字号大小
  // var _root = doc.documentElement,
  //   resizeEvent = 'orientationchange' in win ? 'orientationchange' : 'resize',
  //   resizeCallback = function() {
  //     var clientWidth = _root.clientWidth;
  //     _root.style.fontSize = parseInt(clientWidth / 7.2) + 'px';
  //     document.body && (document.body.style.fontSize = 0.28 + 'rem');
  //   };
  // if (!doc.addEventListener) {
  //   return;
  // }
  // win.addEventListener(resizeEvent, resizeCallback, false);
  // doc.addEventListener('DOMContentLoaded', resizeCallback, false);
  //微信中设置默认字号大小
  // if (typeof WeixinJSBridge == 'object' && typeof WeixinJSBridge.invoke == 'function') {
  //   handleFontSize();
  // } else if (document.addEventListener) {
  //   document.addEventListener('WeixinJSBridgeReady', handleFontSize, false);
  // } else if (document.attachEvent) {
  //   document.attachEvent('WeixinJSBridgeReady', handleFontSize);
  //   document.attachEvent('onWeixinJSBridgeReady', handleFontSize);
  // }
  // function handleFontSize() {
  //   // 设置网页字体为默认大小
  //   WeixinJSBridge.invoke('setFontSizeCallback', {
  //     fontSize: 0
  //   });
  //   // 重写设置网页字体大小的事件
  //   WeixinJSBridge.on('menu:setfont', function() {
  //     WeixinJSBridge.invoke('setFontSizeCallback', {
  //       fontSize: 0
  //     });
  //   });
  // }
  //百度统计
  // setTimeout(function() {
  //   var _hmt = _hmt || [];
  //   (function() {
  //     var hm = document.createElement('script');
  //     hm.src = 'https://hm.baidu.com/hm.js?bc9b71bc093b8d27e9f3a85012ba474c';
  //     var s = document.getElementsByTagName('script')[0];
  //     s.parentNode.insertBefore(hm, s);
  //   })();
  // }, 3000);
})(document, window);
window.PointerEvent = undefined;
