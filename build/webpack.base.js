const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");

const path = require("path");
//process.cwd() 返回 Node.js 进程的当前工作目录
//path.resolve('.')和process.cwd()返回路径相同
const rootDir = process.cwd();
//__dirname 总是指向被执行 js 文件的绝对路径

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(rootDir, "dist"),
    filename: "bundle.[contenthash:8].js",
  },
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
      pub: path.resolve(rootDir, "public"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: ["babel-loader","ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        type: "asset",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, "public/index.html"),
    }),
    // 复制静态资源到打包目录
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "*.js",
          context: path.resolve(rootDir, "public/js"),
          to: path.resolve(rootDir, "dist/js"),
        },
      ],
    }),
    //打包后抽离 css 文件
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    //压缩打包后的 css 文件
    new OptimizeCssPlugin(),
  ],
};
