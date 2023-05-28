// axios的基础封装
import axios from "axios";
import "element-plus/theme-chalk/el-message.css";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import router from '@/router/index'
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});
// 拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

// axios响应拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    // 统一错误提示
    ElMessage({
      type: "warning",
      message: e.response.data.message,
    });
    // 401token失效处理
    if (e.response.status === 401){
      // 1.清除用户信息
      const userStore = useUserStore();
      userStore.clearUserInfo()
      // 2.跳转到登录页
      router.push('/login')
    }
      
      return Promise.reject(e);
  }
);
export default httpInstance;
