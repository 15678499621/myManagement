<!--  -->
<template>
  <div class="myadmin-home">
    <top-header></top-header>
    <h1>数据统计</h1>
    <div class="myadmin-home-static">
      <div class="home-static-left">
        <div class="static-left-total">总的用户量：{{ totalUser }}</div>
        <div class="static-left-user">注册用户：{{ todayUser }}</div>
      </div>
      <div class="home-static-mid">
        <div class="static-mid-left">总订单量：{{ totalOrder }}</div>
        <div class="static-mid-right">新增订单：{{ todayOrder }}</div>
      </div>
      <div class="home-static-right">
        <div class="static-right-admin">管理员：{{ totalAdmin }}</div>
        <div class="static-right-new">新增的管理员：{{ todayAdmin }}</div>
      </div>
    </div>
    <div
      class="myadmin-home-chart"
      id="mychart"
      :style="{ width: '100%', minHeight: '300px' }"
    ></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import TopHeader from "@/components/top-header.vue";
import {
  getTotalUser,
  getTodayUser,
  getTotalOrder,
  getTodayOrder,
  getAdminCount,
  getTodayAdmin,
} from "@/api/api";
import DateUtils from "@/utils/DateUtils";
/* 1. 引入 echarts */
// let echarts = require("echarts");
import * as echarts from "echarts";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    "top-header": TopHeader,
  },
  data() {
    //这里存放数据
    return {
      totalUser: 0, // 总用户量
      todayUser: 0, // 注册用户
      totalOrder: 0, // 总订单量
      todayOrder: 0, // 新增订单
      totalAdmin: 0, // 总的管理员
      todayAdmin: 0, // 新增管理员
      sevenDays: [], // 最近七天的数据的日期 ['2020-12-15'，'2020-12-16',......'2020-12-21']
      // sevenDaysDatas[0] 新增注册用户 7天数据 =>
      // sevenDaysDatas[1] 新增订单 7天数据  =>
      //  sevenDaysDatas[2] 新增管理员 7天数据
      sevenDaysDatas: [[], [], []],
      // [[p1,p2,p3,p4,p5,p6,p7],[p11,p22...]]
      apiData: [[], [], []],
      // apiData[0] => 新增注册用户数据 [0,0,1,2,2,3,4]
      // apiData[1] => 新增订单[0,0,1,2,2,3,4]
      // apiData[2] => 新增管理员 [0,0,1,2,2,3,4]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 初始化七天数据
    initSevenDaysData: function () {
      /* 
        getTodayUser 新增注册用户接口
        getTodayOrder 新增订单接口
        getTodayAdmin 新增管理员接口
        200 请求 每次 发20个请求 10次 每20次返回之后才继续往下执行
        Promise.all([])
      */
      let sevenDaysDatas = [[], [], []];
      this.sevenDays.map((dateString) => {
        // 2020-12-15
        sevenDaysDatas[0].push(getTodayUser(dateString)); // promise
        sevenDaysDatas[1].push(getTodayOrder(dateString)); // promise
        sevenDaysDatas[2].push(getTodayAdmin(dateString)); // promise
      });
      console.log(sevenDaysDatas);
      Promise.all([
        ...sevenDaysDatas[0],
        ...sevenDaysDatas[1],
        ...sevenDaysDatas[2],
      ]).then((res) => {
        console.log(res);
        // 21 个数据 0-6 新增注册用户 7-13 新增订单 14-20 新增管理员
        // 0-6 apiData[0] 7-13 apiData[1] 14-20 apiData[2]
        let apiData = [[], [], []];
        res.map((result, index) => {
          // 0 1 2 3 4 .... 20
          // 0 / 7 = 0
          // 1 /7 = 0.1..
          // 2/7 = 0.2...
          // ...
          // 6/7 = 0.9..
          // 0-6  Math.floor(index/7) => 0
          // 7-13 Math.floor(index/7) => 1
          // 14-20 Math.floor(index/7) => 2
          apiData[Math.floor(index / 7)].push(result.count);
        });
        console.log(apiData);
        this.apiData = apiData;
        // 初始化表格
        this.initChart(this.sevenDays,apiData);
      });
    },
    // 初始化七天时间的字符串
    initSevenDays: function () {
      let sevenDays = [];
      let date = new Date();
      for (let i = 6; i >= 0; i--) {
        let dateString = DateUtils.getCertainDay(
          date.getTime() - i * 24 * 60 * 60 * 1000
        );
        sevenDays.push(dateString);
      }
      this.sevenDays = sevenDays;
    },
    // 初始echart 表格方法
    initChart: function (sevenDays,apiData) {
      let mychart = echarts.init(document.getElementById("mychart"));
      let options = {
        title: {
          text: "折线图堆叠",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["新增注册用户", "新增订单", "新增管理员"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: sevenDays,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "新增注册用户",
            type: "line",
            stack: "总量",
            // 2020-12-15 ...... 2020-12-21
            data: apiData[0],
          },
          {
            name: "新增订单",
            type: "line",
            stack: "总量",
            data: apiData[1],
          },
          {
            name: "新增管理员",
            type: "line",
            stack: "总量",
            data: apiData[2],
          },
        ],
      };
      // echarts
      mychart.setOption(options);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    console.log(this);
    this.totalUser = (await getTotalUser()).count;
    this.todayUser = (await getTodayUser(DateUtils.getToday())).count;
    this.totalOrder = (await getTotalOrder()).count;
    this.todayOrder = (await getTodayOrder(DateUtils.getToday())).count;
    this.totalAdmin = (await getAdminCount()).count;
    this.todayAdmin = (await getTodayAdmin(DateUtils.getToday())).count;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log(echarts);
    // 初始化七天的时间数据
    this.initSevenDays();
    this.initSevenDaysData();
    console.log(this.sevenDays);
  },
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
.myadmin-home {
  h1 {
    text-align: center;
  }
  .myadmin-home-static {
    display: flex;
    height: 90px;
    align-items: center;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    .home-static-left {
      flex: 1;
      display: flex;
      height: 90px;
      line-height: 90px;
      justify-content: space-around;
      border-right: 1px solid #ddd;
      .static-left-total {
      }

      .static-left-user {
      }
    }

    .home-static-mid {
      flex: 1;
      display: flex;
      height: 90px;
      line-height: 90px;
      justify-content: space-around;
      border-right: 1px solid #ddd;
      .static-mid-left {
      }

      .static-mid-right {
      }
    }

    .home-static-right {
      flex: 1;
      display: flex;
      height: 90px;
      line-height: 90px;
      justify-content: space-around;
      border-right: 1px solid #ddd;
      .static-right-admin {
      }

      .static-right-new {
      }
    }
  }
}
</style>