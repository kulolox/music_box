import registerPromiseWorker from 'promise-worker/register';
import { aesDecrypt, aesEncrypt } from '@src/utils/tools';

// 一个worker 加密解密数据,默认加密
registerPromiseWorker(({ data, key, isDecrypt = false }) => {
  return isDecrypt ? aesDecrypt(data, key) : aesEncrypt(data, key);
});
