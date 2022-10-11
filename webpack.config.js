const path = require("path");
const slsw = require("serverless-webpack");

module.exports = {
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  target: "node",
  output: {
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, ".webpack"),
    filename: "index.js",
  },
  resolve: {
    alias: {
      xlsx: path.resolve(__dirname, "./node_modules/xlsx/xlsx.js"),
    },
  },
};
