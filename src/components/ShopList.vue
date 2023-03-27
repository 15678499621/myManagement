<!--  -->
<template>
  <div class="myadmin-shoplist">
    <top-header></top-header>
    <div class="myadmin-shoplist-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline>
              <el-form-item label="评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="最近的评价的人数">
                <span>{{ props.row.rating_count }}</span>
              </el-form-item>
              <el-form-item label="最近订单数量">
                <span>{{ props.row.recent_order_num }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="店铺名称" prop="name"> </el-table-column>
        <el-table-column label="店铺地址" prop="address"> </el-table-column>
        <el-table-column label="店铺介绍" prop="description"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="修改店铺信息" :visible.sync="dialogVisible" width="50%">
      <el-form
        :rules="rules"
        :model="form"
        ref="form"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <!-- @select="handleSelect" -->
          <el-autocomplete
            :fetch-suggestions="querySearch"
            class="inline-input"
            v-model="form.address"
            placeholder="请输入内容"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="店铺介绍">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="上传店铺图片">
          <el-upload
            class="avatar-uploader"
            :action="BASE_URL + 'v1/addimg/avatar'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传店铺营业执照">
          <el-upload
            class="avatar-uploader"
            :action="BASE_URL + 'v1/addimg/avatar'"
            :show-file-list="false"
            :on-success="handleBusinessUpload"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="businessLicenseUrl"
              :src="businessLicenseUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="食品分类" size="normal">
          <el-cascader
            v-model="categoryOptions"
            :options="options"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('form')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import TopHeader from "./top-header";
import {
  getShoplist,
  searchPlace,
  getFoodCatetory,
  updateShop,
} from "@/api/api";
import { BASE_URL, baseImgPath } from "@/config/env";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    "top-header": TopHeader,
  },
  data() {
    //这里存放数据
    return {
      // 校验的规则
      rules: {
        name: [
          {
            required: true,
            trigger: "blur",
            message: "店铺名称不能为空！",
          },
        ],
      },
      categoryOptions: ["快餐便当", "简餐"], // 分类默认选中项 ["快餐便当","简餐"]
      form: {}, // 弹出表格信息
      dialogVisible: false, // 弹出窗口显示或者隐藏
      tableData: [],
      suggestion: "", // 下拉框建议值
      timeId: "", // 定时器ID
      BASE_URL: BASE_URL,
      imageUrl: "", // 店铺图片
      businessLicenseUrl: "",
      options: [], // 级联菜单中的数据
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 表单提交逻辑
    handleSubmit: function (formRef) {
      this.$refs[formRef].validate(async (valid) => {
        if (valid) {
          this.$message("准备提交表单");
          // 向后台提交数据
          // let id = this.form.id;
          // let name = this.form.name
          let { id, name, address, description, phone, image_path } = this.form;
          let category = this.categoryOptions.join("/");
          // updateShop
          // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite
          let result = await updateShop({
            category:category,
            id,
            name,
            address,
            description,
            phone,
            image_path,
          });
          console.log(result);
          if(result.status === 1){
            this.dialogVisible = false;
          }
        } else {
          this.$message({
            type: "warning",
            message: "表单有误，请检查一下",
          });
        }
      });
    },
    // 级联菜单发生变化的时候 的回调函数
    handleChange: function () {},
    // 上传营业执照
    handleBusinessUpload(res, file) {
      this.businessLicenseUrl = baseImgPath + res.image_path;
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.imageUrl = baseImgPath + res.image_path;
      // 修改form表单中的image_path
      this.form.image_path = res.image_path; // 保存操作 最新地址传回后台
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // return isJPG && isLt2M;
      return isLt2M;
    },
    querySearch(queryString, cb) {
      // 延时处理请求的数据
      // 3秒之内 多次触发 多次请求 10输入 => 10次请求
      // 3秒之内 多次触发 最后一次为准 10输入=> 1次请求 防抖
      // clearTimeout(timeId)
      // let timeId = setTimeout(function(){},1000)
      if (this.timeId) {
        clearTimeout(this.timeId);
      }
      this.timeId = setTimeout(async function () {
        // 如果空的话 传到后台会报错
        if (!queryString) {
          cb([]);
          return false;
        }
        let res = await searchPlace({
          keyword: queryString,
        });
        let filterResult = res.map((v) => {
          return {
            value: v.address,
          };
        });
        console.log(filterResult);
        //   console.log(res);
        cb(filterResult);
      }, 1000);
    },
    createOptions: function (foodCategory) {
      console.log(foodCategory);
      let options = [];
      /*      
       options:[
        {
          value:"快餐便当",
          label:"快餐便当",
          children:[
            {
              value:"简餐",
              label:"简餐"
            }
          ]
        }
      ] // 级联菜单中的数据 */
      foodCategory.map((res, index) => {
        options.push({
          value: res.name,
          label: res.name,
          children: [],
        });
        // 有子菜单
        // 三层 四层 五层？ 递归
        if (res.sub_categories.length > 0) {
          res.sub_categories.map((subItem, ii) => {
            options[index].children.push({
              value: subItem.name,
              label: subItem.name,
            });
          });
        }
      });
      this.options = options;
    },
    handleEdit: function (scope) {
      // 显示弹出窗口
      // scope.row => 一行的信息
      this.dialogVisible = true;
      // 把数据赋值给表格
      this.form = scope.row;
      this.imageUrl = baseImgPath + scope.row.image_path;
      console.log(scope);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    let res = await getShoplist();
    let foodCategory = await getFoodCatetory();
    // 构造级联数据
    this.createOptions(foodCategory);
    this.tableData = res;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #ddd;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>