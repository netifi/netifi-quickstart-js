const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, './src/main/js/index.js'),
    output: {
        path: path.resolve(__dirname, './src/main/resources/web/public/'),
        filename: 'app.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            '__DEV__': true,
            '__AS_SERVER__': false,
        }),
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
