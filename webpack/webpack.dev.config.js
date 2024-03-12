const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");
const { merge } = require("webpack-merge");
const WebpackBar = require("webpackbar");

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
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[path][local]___[hash:base64:5]",
              },
            },
          },
          {
            loader: "sass-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [require("autoprefixer")],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "index.[hash].css",
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "./static",
    //       to: "./static",
    //     },
    //   ],
    // }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
    new WebpackBar({
      color: "green",
      profile: true,
    }),
    new CleanWebpackPlugin(),
    new CompressionPlugin(),
  ],
  devtool: "source-map",
});
