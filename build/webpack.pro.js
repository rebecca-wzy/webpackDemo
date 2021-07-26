const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");

module.exports = merge(baseConfig, {
  mode: "production",
  //dist打包后不显示
  // devtool: "hidden-source-map",
  //代码拆分
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    //   webpack4通过设置 mode ，process.env.NODE_ENV会自动得到值
    //   new webpack.DefinePlugin({
    //       'process.env.NODE_ENV':JSON.stringify('production')
    //   })
  ],
});
