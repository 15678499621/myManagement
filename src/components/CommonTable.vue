<!-- 通用的表格 -->
<template>
  <div class="myadmin-common-table">
    <el-table :data="data" height="300" v-dialogDrag>
      <el-table-column
        v-for="col in columns"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
      >
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleCTCurrentChange"
      :total="total"
      layout="sizes,prev, pager,next,jumper"
      :page-sizes="[5, 10, 15]"
      :page-size="pageSize"
      :current-page="currentPage"
      @size-change="handleCTSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: {
    pageSize: {
      type: Number,
      default: 5,
    },
    columns: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
    total: {
      type: Number,
      default: 0,
    },
    handleSizeChange: {
      type: Function,
    },
    handleCurrentChange: {
      type: Function,
    },
    currentPage:{
        type:Number,
        default:1
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
    //   pageSize: 5, // 每一页的条数
    //   currentPage: 1, // 默认第一页
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleCTSizeChange: function (pageSize) {
      this.handleSizeChange(pageSize);
    },
    handleCTCurrentChange: function (currentPage) {
      this.handleCurrentChange(currentPage);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
</style>