const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath: './',
  assetsDir: 'static',
  outputDir: process.env.VUE_APP_OUTPUT,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true // 解决ant-design-vue编译报错问题
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.31.112:8088',
        ws: false,
        changeOrigin: true,
        pathRewrite: { // 代理
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser')
        .tap(args => {
          Object.assign(args[0].terserOptions.compress, {
            drop_console: true
          })
          return args
        })
      config
        .plugin('compress')
        .use(CompressionWebpackPlugin, [{
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.html$|\.css$/,
          threshold: 10240,
          minRatio: 0.8
        }])
    }
  }
}
