const merge = require('webpack-merge');
const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const commonConfig = require('./webpack.common.config');
const prodConfig = {
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
             }
         }),
        new CleanWebpackPlugin(['dist']),
        
        new UglifyJSPlugin()
    ]
};

const config = merge(commonConfig,prodConfig);

module.exports = config;