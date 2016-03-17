"use strict";

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ["babel-loader"], exclude: /node_modules/ }
    ]
  },
  output: {
    library: "Unsplash",
    libraryTarget: "umd"
  },
  externals: [{
    "whatwg-fetch": {
      root: "fetch",
      commonjs2: "whatwg-fetch",
      commonjs: "whatwg-fetch",
      amd: "whatwg-fetch"
    }
  }]
};
