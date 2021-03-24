const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./out"),
    filename: "index.js",
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.template.html" })],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
  },
};
