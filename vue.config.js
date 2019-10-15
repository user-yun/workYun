let illegalURL = "http://121.196.211.83/";
let weatherURL = "https://www.tianqiapi.com/api/"
let path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // plugins: {
  //   autoprefixer: {}
  // },
  publicPath: "./",
  outputDir: "dist",
  // eslint-loader
  lintOnSave: true,
  runtimeCompiler: false,
  transpileDependencies: [
  ],
  // compiler: false,
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.symlinks(true);
  },
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
      'echarts': 'echarts',
      'file-saver': 'saveAs',
      'xlsx': 'XLSX',
      'js-md5': 'md5',
      'nprogress': 'NProgress',
      'vue-count-to': 'CountTo'
    }
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {},
    modules: false
  },
  parallel: require("os").cpus().length > 1,
  pwa: {},
  devServer: {
    open: process.platform === "darwin",
    disableHostCheck: true,
    host: "0.0.0.0",
    port: 8088,
    https: false,
    open: true, //配置自动启动浏览器
    hotOnly: false,
    proxy: { // 设置代理
      "/Example-My": {
        target: "http://0.0.0.0",
        changeOrigin: false,
        pathRewrite: {
          '^/replace': ''
        }
      },
      "/static-resources": {
        target: illegalURL,
        changeOrigin: false,
      },
      "/language": {
        target: illegalURL,
        changeOrigin: false,
      },
      "/web-config": {
        target: illegalURL,
        changeOrigin: false,
      },
      "/weather": {
        target: weatherURL,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/weather': ''
        }
      },
    }
  },
  pluginOptions: {
    // ...
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('#', resolve('src/views/business')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  }
}
