import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import PromiseWorker from 'promise-worker';
import moment from 'moment';

// import * as AesCryptoWorker from '@src/workers/aesCrypto.worker';
import { md5 } from '@src/utils/tools';
import lock from '@src/utils/lock';
import AesCryptoWorker from '@src/workers/aesCrypto.worker';

// import registerPromiseWorker from 'promise-worker/register';
// import { aesDecrypt, aesEncrypt } from '@src/utils/tools';

// // 一个worker 加密解密数据,默认加密
// registerPromiseWorker(({ data, key, isDecrypt = false }) => {
//   return isDecrypt ? aesDecrypt(data, key) : aesEncrypt(data, key);
// });

const adapter = new LocalStorage('async-cache-music-box');
const dbAsyncCache = low(adapter);

const worker = new AesCryptoWorker();
const promiseWorker = new PromiseWorker(worker);

// 获取缓存
async function getCache(key) {
  // lowdb添加缓存，worker解密
  try {
    const cacheData = dbAsyncCache.get(key).value();
    // 如果缓存存在且未过期，解码缓存
    if (cacheData && moment().isBefore(moment(cacheData.timestamp))) {
      const decrypted = await promiseWorker.postMessage({
        data: cacheData.encrypt,
        key,
        isDecrypt: true
      });
      return JSON.parse(decrypted).data;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

// 设置缓存
async function setCache(key, data, timestamp) {
  // worker加密,lowdb添加缓存
  const encrypt = await promiseWorker.postMessage({
    data: JSON.stringify({ data }),
    key
  });
  const cacheData = {
    encrypt,
    timestamp
  };
  return dbAsyncCache.set(key, cacheData).write();
}

/**
 * 异步缓存工具函数
 * @param {string} hashId 键
 * @param {function} request api请求
 * @param {number} time 缓存过期时间，单位s
 * @return {Promise}
 */
export default async function asyncCached(hashId, request, time = 10) {
  return lock(async () => {
    const data = await getCache(md5(hashId));
    if (!data) {
      const serverData = await request();
      const timestamp = moment()
        .add(time, 's')
        .toDate()
        .toUTCString();
      await setCache(md5(hashId), serverData, timestamp);
      return serverData;
    }
    return data;
  }, `asyncCache-${hashId}`);
}
