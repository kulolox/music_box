import crypto from 'crypto';

/**
 * 替换文本中的\n为<br />
 * @param {String} s 原始字符串
 * @returns {String}
 */
export const strToHtml = s => {
  return s.replace(/\n/g, '<br />');
};

/**
 * 判断音乐是否可以播放
 * @param {Object} privileges 原始字符串
 * @returns {Boolean}
 */
export const checkMusic = privilege => {
  return (
    privilege.st !== -1 &&
    privilege.st !== -200 &&
    privilege.fee !== 1 &&
    privilege.fee !== 4 &&
    privilege.fee !== 16
  );
};

/**
 * Is subject is a Object or not
 * @param {*} subject
 * @return {boolean}
 */
export const isObject = subject => {
  return Object.prototype.toString.call(subject) === '[object Object]';
};

/**
 * 判断对象是否为空对象
 * @param {object} obj
 * @return {boolean}
 */
export const isNullObj = obj => {
  return Object.keys(obj).length === 0;
};

/**
 * Deep copy
 * @param {object|array} subject
 * @return {object|array}
 */
export const deepCopy = subject => JSON.parse(JSON.stringify(subject));

export const md5 = text => {
  return crypto
    .createHash('md5')
    .update(text)
    .digest('hex');
};

// 判断客户端是不是pc
export function isPC() {
  const userAgentInfo = navigator.userAgent;
  const Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod'
  ];
  let flag = true;
  // eslint-disable-next-line no-restricted-syntax
  for (let v = 0; v < Agents.length; v += 1) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

/**
 * 返回当前路径中uri的指定参数
 *
 * @param {string} name
 * @return {string|null}
 */
export function getUrlParam(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`); // 构造一个含有目标参数的正则表达式对象
  const r = window.location.search.substr(1).match(reg); // 匹配目标参数
  if (r != null) return decodeURIComponent(r[2]);
  return null; // 返回参数值
}

// 对称加密
export function aesEncrypt(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  let enc = cipher.update(data, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

// 对称解密
export function aesDecrypt(encrypt, key) {
  const decipher = crypto.createDecipher('aes192', key);
  let dec = decipher.update(encrypt, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

/**
 * 获取图片主色调
 * @param {string} url 图片地址
 * @return {Promise}
 */
export function getMainColor(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = '';
    img.src = url;
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      const context = canvas.getContext('2d');
      context.drawImage(this, 0, 0, this.width, this.height);
      let data = [];
      try {
        data = context.getImageData(0, 0, this.width, this.height).data;
      } catch (e) {
        reject(e);
      }
      let r = 0;
      let g = 0;
      let b = 0;
      const len = data.length;
      for (let i = 0; i < len; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      const step = len / 4;
      r /= step;
      g /= step;
      b /= step;
      r = Math.round(r);
      g = Math.round(g);
      b = Math.round(b);
      console.log(r, g, b);
      resolve(`rgb(${r}, ${g}, ${b})`);
    };
  });
}
