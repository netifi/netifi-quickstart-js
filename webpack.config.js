const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/client/js/index.js'),
    output: {
        path: path.resolve(__dirname, './build/'),
        filename: 'app.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            '__DEV__': true,
            '__AS_SERVER__': false,
        }),
        new CopyWebpackPlugin([
            {
                from: './src/client/index.html',
                to: './index.html'
            }
        ])
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
