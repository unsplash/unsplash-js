import path from "path";

export default {
  entry: [
    path.resolve(__dirname, "../src/unsplash.js")
  ],
  output: {
    path: path.resolve(__dirname, "../dist/"),
    library: "Unsplash",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader"
        ]
      }
    ]
  },
  node: {
    fs: "empty"
  }
};
