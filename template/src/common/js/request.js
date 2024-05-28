import axios from "axios";
// 创建axios实例
const service = axios.create({});

/**
 * @name clientConfig
 * @description 请求自定义配置项
 */
// request拦截器
service.interceptors.request.use(
  (config) => {
    console.log("config: ", config);
    Object.assign(config.params, {
      v: 2,
    });
    
    return config;
  },
  (error) => {
    console.log("Network error, Please try later!");
    return Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("The system is busy, please try later.");
    return Promise.reject(error);
  }
);

export default service;
