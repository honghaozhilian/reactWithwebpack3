const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');


module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        app: [
            
            path.join(__dirname,'src/index.js'),
        ],
        tools: ["babel-polyfill",'axios'],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux','redux-thunk']
    },
    output: {
        path: path.join(__dirname,'/dist'),
        filename: 'static/js/[name].[chunkhash].js',
        chunkFilename: 'static/js/[name].[chunkhash].js',
        publicPath : ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    }
                }],

                include: path.join(__dirname,'src'),
                
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 18,
                        name: '[name].[hash:8].[ext]',
                        publicPath: '../images/',
                        outputPath: 'static/images/'
                    },
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                url: false,
                                importLoaders: 1,
                                localIdentName: '[path]__[name]__[local]__[hash:base64:5]'
                            }
                        },
                        'postcss-loader',
                      
                  ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[path]__[name]__[local]__[hash:base64:5]'
                        }
                    },{
                        loader: 'postcss-loader'
                    },{
                        loader: 'sass-loader'
                    },
                    
                  ]
                })
            }
        ]
    },
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router')
        }
    },
    plugins: [
        
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor','tools']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new ExtractTextPlugin({
            filename: 'static/css/[name].[contenthash:5].css',
            allChunks: true
        }),
        
    ]
};