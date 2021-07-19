const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require("path");
const rootDir = process.cwd();

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(rootDir, "dist"),
    filename: "bundle.[contenthash:8].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c|sc)ss$/,
        use: ["style-loader", "css-loader", "less-loader", "sass-loader"],
        exclude: /node_modules/,
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
  ],
};
