// Utility to merge common config with environment-specific config
const merge = require('webpack-merge');

// Import common configuration to keep the code DRY
// With the "common" configuration in place, 
// we won't have to duplicate code within the environment-specific configurations.
const common = require('./webpack.config.common');

// Extracts css for the generated bundle
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/, 
                exclude: /node_modules/,
                use: [ 
                    MiniCssExtractPlugin.loader,
                    { 
                        loader: 'css-loader', 
                        options: { 
                            sourceMap: true, 
                            importLoaders: 1 
                        } 
                    },
                    { 
                        loader: 'postcss-loader', 
                        options: {
                            sourceMap: true,
                            ident: 'postcss',
                            plugins: [
                            require('postcss-import')(),
                            require('postcss-preset-env')(),
                            require('cssnano')(),
                            ]
                        }
                    }
                ]
            }
        ],
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(['public']),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
        })
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        }
    }
});