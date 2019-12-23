import { useEffect, useRef } from 'react';

/**
 * get请求公共hook
 * @param {Function} callback 执行函数
 * @param {Number} delay 间隔时间
 * @returns {*} 数据
 */
export default function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
