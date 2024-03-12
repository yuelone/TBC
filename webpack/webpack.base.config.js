const webpack = require("webpack");
const path = require("path");

const API_HOST = (() => {
  switch (process.env.HOST) {
    case "local":
      return JSON.stringify("http://localhost:3090/");
    case "prod":
      return JSON.stringify("http://localhost:3009/");
    default:
      return JSON.stringify("http://localhost:3009/");
  }
})();

const IS_DEV_ENV = (() => {
  switch (process.env.HOST) {
    case "local":
      return true;

    default:
      return false;
  }
})();

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  resolve: {
    alias: {
      ActionTypes: path.resolve(__dirname, "../src/constants/actionTypes.js"),
      Constants: path.resolve(__dirname, "../src/constants/"),
      Hooks: path.resolve(__dirname, "../src/hooks/"),
      Components: path.resolve(__dirname, "../src/components/"),
      Assets: path.resolve(__dirname, "../src/assets/"),
      Pages: path.resolve(__dirname, "../src/pages/"),
      Redux: path.resolve(__dirname, "../src/redux/"),
      Routes: path.resolve(__dirname, "../src/routes/"),
      Util: path.resolve(__dirname, "../src/util/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules(\/|\\)(?!react-intl|flat)/,
        use: [
          {
            loader: "thread-loader",
            // loaders with equal options will share worker pools
            options: {
              // the number of spawned workers, defaults to (number of cpus - 1) or
              // fallback to 1 when require('os').cpus() is undefined
              workers: 2,

              // number of jobs a worker processes in parallel
              // defaults to 20
              workerParallelJobs: 50,

              // additional node.js arguments
              workerNodeArgs: ["--max-old-space-size=1024"],

              // Allow to respawn a dead worker pool
              // respawning slows down the entire compilation
              // and should be set to false for development
              poolRespawn: false,

              // timeout for killing the worker processes when idle
              // defaults to 500 (ms)
              // can be set to Infinity for watching builds to keep workers alive
              poolTimeout: 2000,

              // number of jobs the poll distributes to the workers
              // defaults to 200
              // decrease of less efficient but more fair distribution
              poolParallelJobs: 50,

              // name of the pool
              // can be used to create different pools with elsewise identical options
              name: "my-pool",
            },
          },
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      API_HOST,
      IS_DEV_ENV,
    }),
  ],
};
