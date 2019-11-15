import { useState, useEffect } from 'react';

/**
 * get请求公共hook
 * @param {Function} fn api接口
 * @param {Object|String|Number} query 参数
 * @returns {*} 数据
 */
export default function useGetData(fn, query) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fn(query);
      setData(result.data);
    };
    fetchData();
  }, [fn, query]);
  return data;
}
