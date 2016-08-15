"use strict";

const webpack = require("webpack");

module.exports = {
  output: {
    library: "Unsplash",
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ["babel-loader"], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.browser": true
    })
  ]
};
