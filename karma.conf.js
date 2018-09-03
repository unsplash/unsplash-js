import path from "path";
import webpack from "webpack";
import webpackConfig from "./webpack_config/webpack.prod.babel";

let karmaConfig = {};

const baseConfig = {
  // karma only needs to know about the test bundle
  files: [
    path.resolve(__dirname, "./webpack_config/tests.webpack.babel.js")
  ],
  frameworks: ["mocha"],
  plugins: [
    "karma-mocha",
    "karma-sourcemap-loader",
    "karma-webpack"
  ],
  // run the bundle through the webpack and sourcemap plugins
  preprocessors: {
    "./webpack_config/tests.webpack.babel.js": ["webpack", "sourcemap"]
  },
  reporters: ["dots"],
  singleRun: true,
  // webpack config object
  webpack: {
    mode: "production",
    devtool: "inline-source-map",
    module: webpackConfig.module,
    plugins: [
      new webpack.DefinePlugin({
        "process.browser": true
      })
    ]
  },
  webpackMiddleware: {
    noInfo: true
  }
};

if (process.env.NODE_ENV === "ci") {
  const browserStack = {
    username: process.env.BROWSER_STACK_USERNAME,
    accessKey: process.env.BROWSER_STACK_ACCESS_KEY
  };
  const customLaunchers = {
    BS_Chrome: {
      base: "BrowserStack",
      os: "Windows",
      os_version: "10",
      browser: "chrome",
      browser_version: "47.0"
    },
    BS_Firefox: {
      base: "BrowserStack",
      os: "Windows",
      os_version: "10",
      browser: "firefox",
      browser_version: "43.0"
    },
    BS_Opera: {
      base: "BrowserStack",
      os: "Windows",
      os_version: "10",
      browser: "opera",
      browser_version: "35.0"
    },
    BS_Safari: {
      base: "BrowserStack",
      os: "OS X",
      os_version: "El Capitan",
      browser: "safari",
      browser_version: "9.0"
    },
    BS_MobileSafari8: {
      base: "BrowserStack",
      os: "ios",
      os_version: "8.3",
      browser: "iphone",
      real_mobile: false
    },
    BS_MobileSafari9: {
      base: "BrowserStack",
      os: "ios",
      os_version: "9.1",
      browser: "iphone",
      real_mobile: false
    },
    BS_InternetExplorer10: {
      base: "BrowserStack",
      os: "Windows",
      os_version: "8",
      browser: "ie",
      browser_version: "10.0"
    },
    BS_InternetExplorer11: {
      base: "BrowserStack",
      os: "Windows",
      os_version: "10",
      browser: "ie",
      browser_version: "11.0"
    }
  };
  karmaConfig = {
    ...baseConfig,
    browserStack,
    plugins: [
      ...baseConfig.plugins,
      "karma-browserstack-launcher"
    ],
    customLaunchers,
    browsers: Object.keys(customLaunchers)
  };
} else {
  karmaConfig = {
    ...baseConfig,
    browsers: ["Chrome", "Firefox", "Safari"],
    plugins: [
      ...baseConfig.plugins,
      "karma-chrome-launcher",
      "karma-firefox-launcher",
      "karma-safari-launcher"
    ]
  };
}

module.exports = function (config) {
  config.set(karmaConfig);
};
