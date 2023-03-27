import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);
/* 避免 ) NavigationDuplicated: Avoided redundant navigation to current location: "/dashboard" */
let originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function (location,onComplete,onAbort) {
//   return originalPush.call(this, location,onComplete,onAbort).catch(() => {});
// };
/* 
  VueRouter.prototype.push = function push (location, onComplete, onAbort) {
      var this$1 = this;

    // $flow-disable-line
    if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        this$1.history.push(location, resolve, reject);
      })
    } else {
      this.history.push(location, onComplete, onAbort);
    }
  };


*/

VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(() => {});
};

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/components/Test"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../components/Dashboard"),
    children: [
      {
        path: "",
        component: () => import("../components/Home"),
        meta: [{ name: "首页", to: "/dashboard" }],
      },
      {
        path: "/userlist",
        component: () => import("../components/UserList"),
        meta: [
          { name: "首页", to: "/dashboard" },
          { name: "数据管理", to: "" },
          { name: "商家列表", to: "" },
        ],
      },
      {
        path: "/adminlist",
        component: () => import("../components/AdminList"),
        meta: [
          { name: "首页", to: "/dashboard" },
          { name: "数据管理", to: "" },
          { name: "管理员列表", to: "" },
        ],
      },
      {
        path: "/shoplist",
        component: () => import("../components/ShopList"),
        meta: [
          { name: "首页", to: "/dashboard" },
          { name: "数据管理", to: "" },
          { name: "商家列表", to: "" },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach(function (to, from, next) {
  console.log("全局前置导航守卫");
  let is_login = localStorage.getItem("is_login"); //从localStorage本地取值，如果有允许跳转，否则留在原页面
  if (is_login || to.path === "/") {
    next();
  } else {
    next("/"); // 否则情况下跳转登陆页面
  }
});

export default router;
