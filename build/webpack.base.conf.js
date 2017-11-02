/**
 * Created by damingming on 2017/10/31.
 */
'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry : {//入口文件
        index : [
            path.resolve(__dirname, '../src/main.js')
        ]
    },
    output : {//输出配置
        path : path.resolve(__dirname, '../dist/static'),
        filename : '[name].[hash:8].js',
        publicPath : 'static/'     //在webpack.dev.conf.js中被修改
    },
    module : {//模块规则
        rules : [
            {
                test : /\.vue$/,
                loader : 'vue-loader'
            },
            {
                test : /\.js$/,
                loader : 'babel-loader?presets=es2015',
                exclude : /node_modules/
            }
        ]
    },
    resolve : {
        extensions : ['.js', '.vue'],
        alias : {
            'vue$' : 'vue/dist/vue.esm.js'
        }
    },//读文件配置
    // devtool:'source-map',
    plugins : [
        new HtmlWebpackPlugin({
            filename : '../index.html',//在webpack.dev.conf.js中被修改
            template : path.resolve(__dirname, '../index.html')
        })
    ]
}