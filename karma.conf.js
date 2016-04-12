'use strict';

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.production');
webpackConfig.devtool = 'inline-source-map';

const baseConfig = {
  // karma only needs to know about the test bundle
  files: [
    'tests.webpack.js'
  ],
  frameworks: ['mocha'],
  plugins: [
    'karma-mocha',
    'karma-sourcemap-loader',
    'karma-webpack'
  ],
  // run the bundle through the webpack and sourcemap plugins
  preprocessors: {
    'tests.webpack.js': ['webpack', 'sourcemap']
  },
  reporters: ['dots'],
  singleRun: true,
  // webpack config object
  webpack: {
    devtool: 'inline-source-map',
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.browser': true
      })
    ]
  },
  webpackMiddleware: {
    noInfo: true
  }
};

let karmaConfig;
if (process.env.NODE_ENV === 'ci') {
  const browserStackUser = {
    username: process.env.BROWSER_STACK_USERNAME,
    accessKey: process.env.BROWSER_STACK_ACCESS_KEY
  };
  const customLaunchers = {
    BS_Chrome: {
      base: 'BrowserStack',
      os: 'Windows',
      os_version: '10',
      browser: 'chrome',
      browser_version: '47.0'
    },
    BS_Firefox: {
      base: 'BrowserStack',
      os: 'Windows',
      os_version: '10',
      browser: 'firefox',
      browser_version: '43.0'
    },
    BS_Opera: {
      base: 'BrowserStack',
      os: 'Windows',
      os_version: '10',
      browser: 'opera',
      browser_version: '35.0'
    },

    BS_Safari: {
      base: 'BrowserStack',
      os: 'OS X',
      os_version: 'El Capitan',
      browser: 'safari',
      browser_version: '9.0'
    },
    BS_MobileSafari8: {
      base: 'BrowserStack',
      os: 'ios',
      os_version: '8.3',
      browser: 'iphone',
      real_mobile: false
    },
    BS_MobileSafari9: {
      base: 'BrowserStack',
      os: 'ios',
      os_version: '9.1',
      browser: 'iphone',
      real_mobile: false
    },
    BS_InternetExplorer10: {
      base: 'BrowserStack',
      os: 'Windows',
      os_version: '8',
      browser: 'ie',
      browser_version: '10.0'
    },
    BS_InternetExplorer11: {
      base: 'BrowserStack',
      os: 'Windows',
      os_version: '10',
      browser: 'ie',
      browser_version: '11.0'
    }
  };
  const browsers = Object.keys(customLaunchers);
  const plugins = ['karma-browserstack-launcher'];

  karmaConfig = Object.assign({}, baseConfig, {
    browserStack: browserStackUser,
    plugins: [].concat(baseConfig.plugins, plugins),
    customLaunchers,
    browsers
  });
} else {
  const browsers = ['Chrome', 'Firefox', 'Safari'];
  const plugins =  [
    'karma-chrome-launcher',
    'karma-firefox-launcher',
    'karma-safari-launcher'
  ];

  karmaConfig = Object.assign({}, baseConfig, {
    browsers,
    plugins: [].concat(baseConfig.plugins, plugins)
  });
}

module.exports = function(config) {
  config.set(karmaConfig);
};
