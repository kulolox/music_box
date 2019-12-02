import { useState, useEffect } from 'react';
import asyncCached from '@src/utils/asyncCache';
/**
 * get请求公共hook
 * @param {Function} fn 请求函数
 * @param {String} cacheKey 缓存键名
 * @param {Number} cache 缓存过期时间
 * @returns {*} 数据
 */
export default function useGetDataByAsyncCached(fn, cacheKey, cache = 0) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await asyncCached(
        cacheKey,
        async () => {
          const t = await fn();
          return t.data;
        },
        cache
      );
      setData(result);
    };
    fetchData();
  }, [fn, cacheKey, cache]);
  return data;
}
