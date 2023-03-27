import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
/* 
  vuex 用来做状态管理
  五大模块
  state 状态
  mutations 同步的修改的操作
  getters  计算属性
  actions 异步的修改的操作
  modules 用来划分模块
*/
export default new Vuex.Store({
  state: {
    breadcrumbs: {
      dashboard: [
        {
          name: "首页",
          to: "/dashboard",
        },
      ],
      shoplist: [
        { name: "首页", to: "/dashboard" },
        { name: "数据管理", to: "" },
        { name: "商家列表", to: "" },
      ],
    },
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {},
});
