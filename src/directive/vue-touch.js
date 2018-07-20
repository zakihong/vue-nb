import Hammer from 'hammerjs';
import $ from 'zepto';
var gestures = ['tap', 'pan', 'pinch', 'press', 'rotate', 'swipe'];
var directions = {
  tap: ['tap', 'doubletap'],
  swipe: ['swipeleft', 'swiperight', 'swipeup', 'swipedown'],
  pan: ['panstart', 'panmove', 'panend', 'pancancel', 'panleft', 'panright', 'panup', 'pandown'],
  pinch: ['pinchstart', 'pinchmove', 'pinchend', 'pinchcancel', 'pinchin', 'pinchout'],
  press: ['press', 'pressup'],
  rotate: ['rotatestart', 'rotatemove', 'rotateend', 'rotatecancel']
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const touchs = {
  bind: function(el, binding) {
    let handler = null;
    let evtType = '';
    let evt = new Hammer.Manager(el);
    for (let key in binding.modifiers) {
      if (key === 'tap') {
        evt.add(new Hammer[(capitalize(key))]({ event: 'doubletap', taps: 2 }));
        evt.add(new Hammer[(capitalize(key))]({ event: 'tap' }));
      } else {
        evt.add(new Hammer[(capitalize(key))]());
      }
    }
    // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
    if (evt.get('doubletap') && evt.get('tap')) {
      //evt.get('doubletap').recognizeWith('tap');
    }

    // we only want to trigger a tap, when we don't have detected a doubletap
    if (evt.get('tap') && evt.get('doubletap')) {
      evt.get('tap').requireFailure('doubletap');
    }

    if (evt.get('pan') && evt.get('pinch')) {
      evt.get('pan').requireFailure('pinch');
    }

    if (evt.get('pinch') && evt.get('pan')) {
      evt.get('pinch').requireFailure('pan');
    }

    for (let key in binding.modifiers) {
      directions[key].forEach(et => {
        evt.on(et, function(e) {
          //返回自定义的属性index
          if ($(e.target).filter('[data-index]').length || $(e.target).parents('[data-index]').length) {
            e.target = $(e.target).filter('[data-index]').length ? e.target : $(e.target).parents('[data-index]')[0];
          }
          if (e.target === evt.element) {
            evt.index = +evt.element.getAttribute('data-index');
            binding.value(et, e, evt);
          }
        });
      });
    }
  }
};
export default touchs;
