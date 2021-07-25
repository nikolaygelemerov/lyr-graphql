const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssResourcesPath = require('./client/styles/shared');

module.exports = {
  entry: './client/index.js',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        // babael-loader module
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // react-refresh/babel plugin for hot reload
            plugins: [require.resolve('react-refresh/babel')].filter(Boolean)
          }
        }
      },
      {
        // .scss loaders configuration
        test: /\.scss$/,
        use: [
          {
            // Use MiniCssExtractPlugin instead of style-loader
            // Extracts separate css files
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              // Defines the number of subsequent .scss loaders
              importLoaders: 3,
              modules: {
                // Add .scss module file naming
                localIdentName: '[name]__[local]__[hash:base64:5]'
              },
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // Use autoprefixer package for postcss
                plugins: ['autoprefixer']
              }
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            // Sharing sass recources
            // Use it for constants only when working with css modules
            loader: 'sass-resources-loader',
            options: {
              resources: cssResourcesPath
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    })
  ]
};
