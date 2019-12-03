const axios = require('axios');
const basicUrl = 'https://api.kulolox.cn';

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

export const getLyric = id => {
  // if (!id) return () => {};
  return axios.get(`${basicUrl}/lyric?id=${id}`);
};
