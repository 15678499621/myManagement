<!--  -->
<template>
<div class=''>
    <h1>Test组件</h1>
    <h2>{{msg}}</h2>
    <button @click="msg='😀'">改变成表情</button>
    <my-demo :value="msg"></my-demo>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Demo from "./Demo"
import axios from "axios"
/* 
    本地请求 http://localhost:8080/search?keywords='热门'
    转发到 https://apimusic.linweiqin.com/search?keywords='热门'
 */
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    "my-demo":Demo
},
data() {
//这里存放数据
return {
    msg:"(*^_^*)"
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    axios.get("/search",{
        params:{
            keywords:"热门"
        }
    }).then(res=>{
        console.log(res);
    })
    axios.get("http://rap2api.taobao.org/app/mock/273675/demo").then(res=>{
        console.log(res.data);
        // let result = JSON.parse(res.data); // 报错
        // console.log(result);
    })
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>

</style>