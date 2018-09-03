import baseConfig from "./webpack.base.babel";

export default {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    filename: "unsplash.js"
  },
  optimization: {
    minimize: false
  }
};
