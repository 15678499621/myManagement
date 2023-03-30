import Vue from 'vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);
Vue.config.productionTip = false
import  './utils/directive'//自定义拖拽指令
import './public/style/common.css'//共样式

new Vue({
  router,
  store,
  render: h => h(App) // 主入口
}).$mount('#app')

