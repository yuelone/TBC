const HtmlWebpackPlugin = require("html-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
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
  module: {
    rules: [
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "src/assets/favicon.ico",
      filename: "index.html",
      template: "./public/index.html",
      inject: "body",
    }),
    new PreloadWebpackPlugin({
      rel: "preload",
      as(entry) {
        if (/.svg$/.test(entry)) return "image";
      },
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
