const axios = require('axios');
const basicUrl = 'http://aliyun.kulolox.cn:3000';

export const getBanner = type => {
  return axios.get(`${basicUrl}/banner?type=${type}`);
};

export const getAlbum = ({ limit, order }) => {
  return axios.get(`${basicUrl}/top/playlist?limit=${limit}&order=${order}`);
};

export const getPlaylist = id => {
  return axios.get(`${basicUrl}/playlist/detail?id=${id}`);
};

export const getSongs = ids => {
  return axios.get(`${basicUrl}/song/url?id=${ids}`);
};
