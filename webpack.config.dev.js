const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [
            { 
                test: /\.css$/, 
                exclude: /node_modules/,
                use: [ 
                    'style-loader',
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
                            ]
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        open: true,
        historyApiFallback: true
    }
});