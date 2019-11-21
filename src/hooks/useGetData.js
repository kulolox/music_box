import { useState, useEffect } from 'react';

/**
 * get请求公共hook
 * @param {Function} fn 请求函数
 * @returns {*} 数据
 */
export default function useGetData(fn) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fn();
      setData(result.data);
    };
    fetchData();
  }, [fn]);
  return data;
}
