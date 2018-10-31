const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const commonConfig = require('./webpack.common.config');

const devConfig = {
    devtool: 'inline-source-map',
    entry: {
        app: [
            "babel-polyfill",
            'react-hot-loader/patch',
            path.join(__dirname,'src/index.js'),
        ]
    },
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: 'static/js/[name].[hash].js'
    },
    devServer: {
        contentBase: path.join(__dirname,'./dist'),
        // host: 'localhost',
        port: 8080,
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: true,
        stats: 'errors-only',
        proxy: {
            '/api/*': "http://localhost:8090/$1"
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            MOCK: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyzerPlugin()
    ]
};

const config = merge({
    customizeArray(a,b,key) {
        if(key == 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig,devConfig);
console.log(config);
module.exports = config;