import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from "./App.vue";
import router from "./router";
import {directivePlugin} from './directives/index'
// 引入全局组件插件
import {componentPlugin} from '@/components'
// 引入初始化样式文件
import "@/styles/common.scss";
const app = createApp(App);
const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(directivePlugin);
app.use(componentPlugin);
app.mount("#app");


