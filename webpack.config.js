const path = require("path");
const Dotenv = require("dotenv-webpack");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const isProductionMode = process.env.NODE_ENV === "production";
const sassModuleRegexp = /\.module\.s[ac]ss$/;
const sassRegexp = /\.s[ac]ss$/;
const tsRegexp = /\.(ts|tsx)$/;

module.exports = () => {
  const sassModuleRules = () => {
    return [
      !isProductionMode && require.resolve("style-loader"),
      isProductionMode && {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: require.resolve("css-loader"),
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: isProductionMode ? "[hash:base64:8]" : "[local]--[hash:base64:8]",
            mode: "local"
          }
        }
      },
      {
        loader: require.resolve("postcss-loader"),
        options: {
          postcssOptions: {
            ident: "postcss",
            config: isProductionMode ? path.resolve(__dirname, "src/app/webpack", "postcss.config.js") : false
          },
          sourceMap: !isProductionMode
        }
      }
    ].filter(Boolean);
  };

  return {
    entry: "./index.tsx",
    devtool: !isProductionMode && "source-map",
    mode: isProductionMode ? "production" : "development",
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html")
      }),
      new MiniCssExtractPlugin({
        filename: isProductionMode ? "static/css/[name].[contenthash:8].css" : "static/css/chunk/bundle.css",
        chunkFilename: isProductionMode ? "static/css/chunk/[name].[contenthash:8].css" : "static/css/chunk/[name].css"
      }),
      new Dotenv(),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public", "favicon.ico")
          }
        ]
      })
      // new BundleAnalyzerPlugin()
    ].filter(Boolean),

    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: "./tsconfig.json",
          logLevel: isProductionMode ? "info" : "error",
          extensions: [".ts", ".tsx"],
          mainFields: ["browser", "main"]
        })
      ]
    },
    module: {
      rules: [
        {
          test: tsRegexp,
          exclude: /^node_modules/,
          loader: "ts-loader",
          options: {
            configFile: "./tsconfig.json"
          }
        },
        {
          test: sassModuleRegexp,
          use: sassModuleRules()
        },
        {
          test: sassRegexp,
          exclude: sassModuleRegexp,
          use: sassModuleRules()
        }
      ].filter(Boolean)
    },
    performance: {
      hints: false
    },
    devServer: {
      watchFiles: path.join(__dirname, "src")
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: isProductionMode ? "static/js/[name].[contenthash:8].js" : "static/js/chunk/bundle.js",
      chunkFilename: isProductionMode ? "static/js/chunk/[name].[contenthash:8].js" : "static/js/chunk/[name].js",
      assetModuleFilename: "static/media/[name].[hash][ext]",
      clean: true
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.ts(\?.*)?$/i,
          parallel: true
        })
      ]
    }
  };
};
