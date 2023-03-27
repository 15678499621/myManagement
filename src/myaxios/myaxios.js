import axios from "axios";
/*
 在跨域请求时，会携带用户凭证 当配置了 withCredentials = true时，
 必须在后端增加 response 头信息Access-Control-Allow-Origin，且必须指定域名，而不能指定为*
 如果后端需要带cookie过去，前端需要设置为true
*/ 
axios.defaults.withCredentials = true 
/* 基本的 url */
const instance = axios.create({
  baseURL: "http://linweiqin.cn:8001/",
});
/* 响应的拦截器 */
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
