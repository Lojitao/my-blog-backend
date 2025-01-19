import axios from 'axios';
import { hasValidToken,setToken,getToken } from "../utils/cookie.js";

// 获取 baseURL
const baseURL = import.meta.env.VITE_API_BASE_URL;

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL, // 替换为你的 API 基础地址
  timeout: 10000, // 超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()//取讀token
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('response',response);
    
    return response.data; // 直接返回数据
  },
  (error) => {
    // 错误处理
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;