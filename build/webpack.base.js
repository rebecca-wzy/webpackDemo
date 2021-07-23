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
  entry: "./src/index.js",
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
        use: ["babel-loader", "ts-loader"],
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
        parser: {
          //当小于10kb时转成base64，否则生成文件
          //转成base64是为了减少http请求，转为base64以后小图片可以跟js同时被加载到浏览器，
          //而不需要多次对服务器发出图片资源请求,但体积会变大约1/3左右
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "img/[name].[hash:7][ext]",
        },
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
