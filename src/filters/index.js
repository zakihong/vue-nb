import Vue from 'vue';
import { formatPrice, formatDistance } from '../utils';

//金额
Vue.filter('currency', money => formatPrice(money));
