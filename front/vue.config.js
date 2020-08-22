module.exports = {
  publicPath: './',
  lintOnSave: false,

  //生产环境的 source map
  productionSourceMap: false,
  css:{
    
  },

  // devServer: {
  //   port: '8080', // 配置跨域，请求后端接口
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:9000',
  //       ws: true,
  //       changeOrigin: true,
  //       cookieDomainRewrite: 'localhost', //如果服务器不在本地，登录成功后，set-cookie到localhost
  //     },
  //   },
  // },

  pluginOptions: {
  }
}
