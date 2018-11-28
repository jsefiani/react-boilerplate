const path = require('path');

// Extracting styles
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin')

const APP_DIR = path.join(__dirname, "src");

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    bundle: APP_DIR + "/index.jsx"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    // using cache busting
    filename: "[name].[contenthash].js", 
  },
  module: {
    rules: [
      {
        // Transpiles javascript files 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      // Will create a stand-alone index.html file
      template: path.join(__dirname, 'index.html')
    }),
  ],
};