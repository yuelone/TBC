const HtmlWebpackPlugin = require("html-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const baseConfig = require("./webpack.base.config");
const publicPath = "/";

module.exports = merge(baseConfig, {
  mode: "production",
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  stats: {
    warnings: false,
  },
  output: {
    filename: "bundle.[contenthash].js",
    assetModuleFilename: "images/[name].[contenthash][ext]",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 5,
          compress: {
            unused: true,
            dead_code: true,
            drop_console: true,
          },
          mangle: true,
          ie8: true,
        },
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "src/assets/favicon.ico",
      filename: "index.html",
      template: "./public/index.html",
      inject: "body",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      cache: true,
    }),
    new PreloadWebpackPlugin({
      rel: "preload",
      as(entry) {
        if (/\.(png|svg|jpg|jpeg|gif)$/.test(entry)) return "image";
        if (/\.(scss|css)$/.test(entry)) return "style";
        if (/.woff$/.test(entry)) return "font";
        return "script";
      },
    }),
    new MiniCssExtractPlugin({
      filename: "index.[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public/robots.txt"),
          to: path.resolve(__dirname, "./dist"),
        },
        {
          from: path.resolve(__dirname, "../public/sitemap.xml"),
          to: path.resolve(__dirname, "./dist"),
        },
      ],
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
    new BundleAnalyzerPlugin(),
  ],
  devtool: false,
});
