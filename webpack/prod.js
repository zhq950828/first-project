const merge = require('webpack-merge');
const webpack = require('webpack');
const webpackConfigBase = require('./base');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const prodConfig = {
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'IS_DEVELOPMETN': false,
        }),
    ],
};

module.exports = merge.merge(webpackConfigBase, prodConfig);