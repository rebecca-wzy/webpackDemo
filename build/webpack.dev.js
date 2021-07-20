const webpack = require("webpack")
const { merge } = require("webpack-merge");
const path = require('path')

const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "development",
  //精确定位报错信息所在代码位置
  devtool: "eval-cheap-module-source-map",
  cache: {
    type: "memory",
  },
  devServer: {
    host: "192.168.88.90",
    port: "3001",
    hot: true,
    // 是否启动gzip压缩
    compress: true,
    proxy: {
      "/api": {
        target: "",
        pathRewrite: {
          "/api": "",
        },
      },
    },
  },
  plugins: [
    // webpack4通过设置 mode ，process.env.NODE_ENV会自动得到值
    new webpack.DefinePlugin({
      'process.cwd':JSON.stringify(process.cwd()),
      'path':JSON.stringify(path.resolve('.'))
    }),
  ],
});
