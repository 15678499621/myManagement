<!-- 顶部的header 部分 -->
<template>
  <div class="">
    <div class="myadmin-header">
      <div class="myadmin-header-left">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- <el-breadcrumb-item :to="{ path: '/dashboard' }"
            >首页</el-breadcrumb-item
          > -->
          <el-breadcrumb-item
            v-for="item in $route.meta"
            :to="{ path: item.to }"
            :key="item.name"
            >{{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <button @click="getVuexData">获取 store 数据</button> -->
      </div>
      <!-- <button @click="getRouteParms">获取路由参数</button> -->
      <div class="myadmin-header-right">
        <el-dropdown @command="handleCommand">
          <img
            class="header-right-profile"
            src="../assets/profile.jpg"
            alt=""
          />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="index">首页</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { logout } from "@/api/api";
/* 引入辅助函数 mapState => 将仓库中的值 引入到页面组件中 */
import { mapState } from "vuex";
// console.log(mapState(["breadcrumbs"]));
export default {
  //import引入的组件需要注入到对象中才能使用
  /* 
    $router => 提供路由跳转方法
    $route => 路由传过来的参数
  */

  components: {},
  data() {
    //这里存放数据
    return {
      // breadCrumbs:[]
      ...mapState(["breadcrumbs"]),
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getVuexData: function () {
      console.log(this.breadcrumbs()["shoplist"]);
    },
    getRouteParms: function () {
      console.log(this.$route);
    },
    handleCommand: async function (command) {
      console.log(command);
      //？ if 层次太多了 =>
      // 1. switch(type){}
      // 2. 策略模式
      if (command === "index") {
        // 跳转首页
        this.$router.push("dashboard");
      } else if (command === "logout") {
        // 调用退出的接口 同时跳转到登录的页面
        let result = await logout();
        if (result.status === 1) {
          this.$message("退出成功了");
          // debugger
          localStorage.removeItem("is_login");
          this.$router.push("/");
        }
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  //   mounted() {
  //       let key = location.hash.slice(2)||"dashboard"
  //       this.breadCrumbs = this.$store.state.breadcrumbs[key]
  //   },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.myadmin-header {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eff2f7;
  padding: 10px;
  .myadmin-header-left {
  }

  .myadmin-header-right {
    .header-right-profile {
      height: 36px;
      width: 36px;
      border-radius: 50%;
    }
  }
}
</style>