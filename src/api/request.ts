import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// 简单的 API 客户端
const api = axios.create({
    baseURL: "https://api.aa5p.com/",
    timeout: 60000,
    // 添加调试支持
    headers: {
        'Content-Type': 'application/json',
    },
});

  
  // 请求拦截器
  api.interceptors.request.use(
    async (config) => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('获取token失败:', error);
      }
      
      // 开发模式下打印请求信息
      if (__DEV__) {
        console.log(`🌐 [API] Request: ${config.url}`, config.data);
      }
      
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  // 响应拦截器
  api.interceptors.response.use(
    (response) => {
      // 开发模式下打印响应信息
      if (__DEV__) {
        console.log(`🌐 [API] Response:`, response.data);
        console.log(`🌐 [API] Response Status:`, response.status);
      }
      return response;
    },
    (error) => {
      // 开发模式下打印错误信息
      if (__DEV__) {
        console.error(`🌐 [API] Error:`, {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
          url: error.config?.url,
          method: error.config?.method
        });
      }
      return Promise.reject(error);
    }
  );

export default api;