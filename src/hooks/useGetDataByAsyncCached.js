import { useState, useEffect, useRef } from 'react';
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
  const saveFn = useRef();
  useEffect(() => {
    saveFn.current = fn;
  }, [fn]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await asyncCached(
        cacheKey,
        async () => {
          const t = await saveFn.current();
          return t.data;
        },
        cache
      );
      setData(result);
    };
    fetchData();
  }, [cacheKey, cache]);
  return data;
}
