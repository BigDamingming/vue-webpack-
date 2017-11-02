/**
 * Created by damingming on 2017/11/1.
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');


var config = require('./webpack.base.conf');

//引入webpack.base.conf.js, 在此文件修改配置

config.output.publicPath = '/';

config.plugins = [
    //添加了三个插件
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
        filename:'index.html',
        template:path.resolve(__dirname,'../index.html'),
        inject:true
    })
]

// var devClient = 'webpack-hot-middleware/client';
var devClient = './build/dev-client';

Object.keys(config.entry).forEach(function(name,i){
    var extras = [devClient];
    config.entry[name] = extras.concat(config.entry[name])
})

module.exports = config;