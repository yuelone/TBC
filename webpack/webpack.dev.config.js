const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");
const { merge } = require("webpack-merge");

const baseConfig = require("./webpack.base.config");

const HOST = "localhost";
const PORT = 3009;

module.exports = merge(baseConfig, {
  mode: "production",
  performance: {
    hints: false,
  },
  output: {
    filename: "bundle.[hash].js",
    assetModuleFilename: "images/[name].[hash][ext]",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    host: HOST,
    port: PORT,
    contentBase: "./dist",
    open: true,
    compress: true,
    historyApiFallback: true,
    allowedHosts: ["auto"],
    watchOptions: {
      poll: false,
      ignored: /node_modules/,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "src/assets/favicon.ico",
      filename: "index.html",
      template: "./public/index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "index.[hash].css",
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
  ],
  devtool: "source-map",
});
