const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.tsx',
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    watchFiles: path.join(__dirname, 'src')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
}
