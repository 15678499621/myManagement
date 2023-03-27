<!-- 用户列表的文件 -->
<template>
  <div class="myadmin-userlist">
    <top-header></top-header>
    <div class="userlist-table">
      <common-table
        :columns="columns"
        :data="adminListData"
        :total="total"
        :handle-size-change="handleSizeChange"
        :handle-current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page="currentPage"
      ></common-table>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import TopHeader from "@/components/top-header";
import { getAdminCount, getAdminList } from "@/api/api";
import ComonTable from "@/components/CommonTable";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    "top-header": TopHeader,
    "common-table": ComonTable,
  },
  data() {
    //这里存放数据
    return {
      // 页面表格数据
      adminListData: [],
      total: 0, // 总的注册用户数
      pageSize: 5,
      currentPage:1,
      // 表格列的信息
      columns: [
        {
          id: "user_name",
          label: "姓名",
        },
        {
          id: "create_time",
          label: "注册日期",
        },
        {
          id: "city",
          label: "注册地址",
        },
          {
          id: "admin",
          label: "权限",
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 处理页条数发生变化的情况
    handleSizeChange: function (pageSize) {
      this.pageSize = pageSize;
      console.log(pageSize);
      this.currentPage = 1;
      this.getadminListData({
        pageNum: 1,
      });
    },
    // 处理分页 点击页码
    handleCurrentChange: function (currentPage) {
      console.log(currentPage); // 当前点击的页码
      this.currentPage = currentPage;
      this.getadminListData({
        pageNum: currentPage,
      });
    },
    // 获取用户列表数据
    getadminListData: async function (params) {
      let res = await getAdminList({
        limit: this.pageSize,
        offset: (params.pageNum - 1) * this.pageSize,
      });
      this.adminListData = res.data||[];
    },
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    this.getadminListData({
      pageNum: 1,
    });
    let res_total = await getAdminCount();
    this.total = res_total.count;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.myadmin-userlist {
  height: 100%;
  overflow-y: scroll;
}
</style>