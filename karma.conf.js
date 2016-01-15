var webpack = require('webpack');
var webpackConfig = require('./webpack.config.production');
webpackConfig.devtool = 'inline-source-map';

 module.exports = function (config) {
   config.set({
     browsers: [ 'Chrome', 'Firefox', 'Safari' ],
     // karma only needs to know about the test bundle
     files: [
       'tests.webpack.js'
     ],
     frameworks: [ 'mocha' ],
     plugins: [
       'karma-chrome-launcher',
       'karma-firefox-launcher',
       'karma-mocha',
       'karma-safari-launcher',
       'karma-sourcemap-loader',
       'karma-webpack'
     ],
     // run the bundle through the webpack and sourcemap plugins
     preprocessors: {
       'tests.webpack.js': [ 'webpack', 'sourcemap' ]
     },
     reporters: [ 'dots' ],
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
         }),
         new webpack.IgnorePlugin(/^form-data/),
         new webpack.IgnorePlugin(/^node-fetch/)
       ]
     },
     webpackMiddleware: {
       noInfo: true
     }
   });
 };


