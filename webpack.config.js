const path = require("path");
const Dotenv = require("dotenv-webpack");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  return {
    entry: "./index.tsx",
    devtool: "source-map",
    mode: "production",
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html")
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css"
      }),
      new Dotenv()
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: "./tsconfig.json",
          logLevel: "info",
          extensions: [".ts", ".tsx"],
          mainFields: ["browser", "main"]
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /^node_modules/,
          loader: "ts-loader",
          options: {
            configFile: "./tsconfig.json"
          }
        },
        {
          test: /\.module\.s[ac]ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: path.resolve(__dirname, "dist/css")
              }
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: "[local]--[hash:base64:5]",
                  mode: "local"
                }
              }
            },
            {
              loader: "sass-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, "src/app/webpack", "postcss.config.js")
                }
              }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /\.module\.s[ac]ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: path.resolve(__dirname, "dist/css")
              }
            },
            "css-loader",
            "sass-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, "src/app/webpack", "postcss.config.js")
                }
              }
            }
          ]
        }
      ]
    },
    devServer: {
      watchFiles: path.join(__dirname, "src")
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "[contenthash].bundle.js"
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.ts(\?.*)?$/i,
          parallel: true
        })
      ],
      splitChunks: {
        chunks: "async",
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        enforceSizeThreshold: 5000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  };
};
