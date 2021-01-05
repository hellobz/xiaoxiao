module.exports = {
  devServer: {
    open: true,
    proxy: {
      "/api": {
        target: "http://m.maoyan.com",
        ws: false, //如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
