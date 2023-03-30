module.exports = {
    lintOnSave:true,
   // 所有接口统一配置
    devServer: {
      //跨域代理 前端访问http://linweiqin.cn:8001  代理成访问 https://apimusic.linweiqin.com
        proxy: 'https://apimusic.linweiqin.com'  
      }

    // 参考配置 https://blog.csdn.net/m0_53808238/article/details/128704338
    // decServer:{
    //   './api':{
    //     target:'https://apimusic.linweiqin.com',
    //     //允许跨域
    //     changeOrigin:true,
    //     ws:true,
    //     pathRewrite:{
    //       '^/api':''
    //     }     

    //   }
    // }
}