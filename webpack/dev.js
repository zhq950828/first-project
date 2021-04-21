const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackConfigBase = require('./base');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const PORT = 8082;

const devConfig = {
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'IS_DEVELOPMETN': true,
        }),
        new OpenBrowserPlugin({
            url: `http://localhost:${PORT}/`,
        }),
    ],
    devServer: {
        // proxy: proxy,
        historyApiFallback: false,
        hot: true,
        host: '0.0.0.0',
        port: PORT,
        disableHostCheck: true,
        // open: 'Google Chrome',
    },
};

module.exports = merge.merge(webpackConfigBase, devConfig);