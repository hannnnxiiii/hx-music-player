import axios from 'axios';

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'http://localhost:3000', // 设置基础URL，指向json-server的地址
  timeout: 5000,                    // 设置请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 可以在此处添加token等
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
