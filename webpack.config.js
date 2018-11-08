const path = require('path');

// Extracting styles
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin')
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const APP_DIR = path.join(__dirname, "src");

const config = (env, argv) => {
  console.log('argv', argv.mode)
  return {
    mode: argv.mode,
    entry: {
      bundle: APP_DIR + "/index.jsx"
    },
    output: {
      path: path.resolve(__dirname, "public"),
      // using cache busting
      filename: "[name].[chunkhash].js", 
      // publicPath: "./"
    },
    module: {
      rules: [
        {
          // Transpiles javascript files 
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              }
          }
        },
      ]
    },
    plugins: [
      new htmlWebpackPlugin({
        // Will create a stand-alone index.html file
        template: path.join(__dirname, 'index.html')
      }),
    ],
    devtool: argv.mode === 'production' ? "" : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      open: true
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    }
  }
};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};




module.exports = config;