const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin') // 壓縮 js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 壓縮 css
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const baseConfig = require('./webpack.base.config')

const cleanOptions = {
  root: __dirname,
  verbose: false,
  dry: false,
}

const publicPath = '/reactHighspeedrail/'
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    path: resolveApp('dist'),
    // filename: 'assets/js/[name].[hash:4].js',
    chunkFilename: 'assets/js/[name].[hash:4].chunk.js',
    publicPath,
  },

  optimization: {
    splitChunks: {
      hidePathInfo: true,
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        commons: {
          chunks: 'all',
          name: 'commons',
          minChunks: 2,
          priority: 1,
        },
        reactBase: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]react*|redux*|prop-types[\\/]/,
          priority: 10,
        },
        bootstrapBase: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/](bootstrap|jquery|)[\\/]/,
          priority: 10,
        },
        formControl: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/](formik|yup|react-select)[\\/]/,
          priority: 15,
        },
        utils: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]lodash*[\\/]/,
          priority: 10,
        },
        // vendors: {
        //   name: 'vendors',
        //   chunks: 'initial',
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: 5,
        // },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 5,
          compress: {
            drop_console: true,
          },
          // 开启并行压缩
          // parallel: 4,
          // cache: true,
          mangle: true,
          ie8: true,
        },
      }),
    ],
  },

  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: 'html-loader',
      //       options: {
      //         minimize: true,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'thread-loader', 'css-loader'],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'thread-loader',
            // loaders with equal options will share worker pools
            options: {
              // set to 2 to avoid sass-loader problem
              // number of jobs a worker processes in parallel
              // defaults to 20
              workerParallelJobs: 2,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  performance: {
    hints: 'warning',
  },

  plugins: [
    new webpack.DefinePlugin({
      PROJECT_ROOT: JSON.stringify(publicPath),
    }),
    new CleanWebpackPlugin(cleanOptions),
    new HtmlWebPackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html',
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
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[hash:4].css',
    }),
    new OptimizeCSSAssetsPlugin(),
  ],
})
