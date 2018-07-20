import api from '../api/api';
import { jsonCallback } from '../utils';
import Mock from 'mockjs';
Mock.mock(api.getDeviceInfo.url, 'get', jsonCallback({ name: 1 }));
