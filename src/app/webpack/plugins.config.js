const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  MiniCssExtractPlugin: new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
    chunkFilename: "[id].css"
  })
};
