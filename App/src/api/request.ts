import axios from 'axios';


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
    (config) => {
      const token = typeof globalThis !== 'undefined' && (globalThis as any).localStorage ? (globalThis as any).localStorage.getItem('token') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // 打印请求信息
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
      // 打印响应信息
      if (__DEV__) {
        console.log(`🌐 [API] Response:`, response.data.data);
      }
      return response;
    },
    (error) => {
      // 打印错误信息
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