import myaxios from "../myaxios/myaxios";

/* 
    导出各种接口
*/
// export const login = (params) =>
//   myaxios.post("admin/login", params).catch((err) => console.log(err));
export const login = (params) => {
  return myaxios.post("admin/login", params).catch((err) => console.log(err));
};
/* 退出接口 */
export const logout = () => {
  return myaxios.get("admin/signout").catch((err) => {
    console.log(err);
  });
};

// import { logout } from "..."
// export default logout  // import logout from "...."
/* 总的用户量 */
export const getTotalUser = () => {
  return myaxios.get("v1/users/count").catch((err) => {
    console.log(err);
  });
};
/* 获取某天用户注册量 */
export const getTodayUser = (date) => {
  return myaxios
    .get("/statis/user/" + date + "/count")
    .catch((err) => console.log(err));
};
/* 获取总的订单量 */
export const getTotalOrder = () => {
  return myaxios.get("bos/orders/count").catch((err) => console.log(err));
};
/* 获取某天的订单 */
export const getTodayOrder = (date) => {
  return myaxios
    .get("statis/order/" + date + "/count")
    .catch((err) => console.log(err));
};
/* 获取管理员数量 */
export const getAdminCount = () => {
  return myaxios.get("admin/count").catch((err) => console.log(err));
};
/* 新增管理员 */
export const getTodayAdmin = (date) => {
  return myaxios
    .get(`statis/admin/${date}/count`)
    .catch((err) => console.log(err));
};
/* 获取用户列表 */
export const getUserList = (params) => {
  return myaxios
    .get("/v1/users/list", {
      params: params,
    })
    .catch((err) => console.log(err));
};
/* 获取管理员列表的数据 */
export const getAdminList = (params) => {
  return myaxios
    .get("/admin/all", {
      params: params,
    })
    .catch((err) => console.log(err));
};
/* 获取商品列表的接口 */
export const getShoplist = (params) => {
  return myaxios
    .get("shopping/restaurants", {
      params: {
        latitude: 0,
        longitude: 0,
        ...params,
      },
    })
    .catch((err) => console.log(err));
};
/* 模糊搜索地址接口 */
export const searchPlace = (params)=>{
  return myaxios.get("/v1/pois",{
    params:{
      city_id:11, // 后台 深圳
      type:"search",
      ...params
    }
  })
}
/* 食品分类的接口 */
export const getFoodCatetory = ()=> myaxios.get("/shopping/v2/restaurant/category").catch(err=>console.log(err))

/* 更新餐馆接口 */
export const updateShop = (params)=> myaxios.post("/shopping/updateshop",params).catch(err=>console.log(err))