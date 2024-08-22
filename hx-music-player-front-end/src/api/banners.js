import axios from './axios';

// 获取所有图片
export const getBanners = () => {
  return axios.get('/banners');
};
