# vue-webpack-Single-page
vue+webpack 单页面项目搭建
运行指令 ：
    webpack --config ./build/webpack.dev.conf.js
    node ./build/dev-server.js
    
一步步搭建：
  1. 搭建项目目录结构，安装依赖性
  2. 配置webpack
  3. 实时编译文件
  4. 热加载，自动刷新浏览器
  5. 监听html文件变化

一、搭建项目目录结构，安装依赖性
①新建项目文件夹  vuedemo
② cmd：npm init -y   生成package.json文件
③npm install vue webpack webpack-dev-server vue-loader vue-html-loader css-loader vue-style-loader vue-hot-reload-api babel-loader babel-core babel-plugin-transform-runtime babel-preset-es2015 babel-runtime@5 html-webpack-plugin vue-template-compiler --save-dev
④根目录下新建index.html  <div id="app"></div>
⑤根目录下新建目录src
--src
  --main.js //入口文件
  --template.vue  //app组件
· --components  //组件目录

组件结构：
<template>
<addDemo1></addDemo1>
</template>
<script>
    //    import addDemo1 from './components/demo1.vue'
    export default{
        data(){

        },
        components:{
            //            addDemo1   //组件中组件引入方式
        },
        methods:{

        },
        computerd:{

        }
    }
</script>
<style lang="css">

</style>

main.js结构:
import Vue from 'vue'
import App from './template'   //引入template.vue
new Vue({
    el:'#app',
    template:'<App/>',
    components:{App}//组件引入方式
})

二、配置webpack
⑥根目录下新建目录build
--build
  --webpack.base.conf.js 

webpack.base.conf.js结构:
'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:{//入口文件
        index:[
            path.resolve(__dirname,'../src/main.js')
        ]
    },
    output:{//输出配置
        path:path.resolve(__dirname,'../dist/static'),
        filename:'[name].[hash:8].js',
        publicPath:'static/'
    },
    module:{//模块规则
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.js$/,
                loader:'babel-loader?presets=es2015',
                exclude:/node_modules/
            }
        ]
    },
    resolve:{
        extensions:['.js','.vue'],
        alias:{
            'vue$':'vue/dist/vue.esm.js'
        }
    },//读文件配置
    // devtool:'source-map',
    plugins:[
        new HtmlWebpackPlugin({
            filename:'../index.html',
            template:path.resolve(__dirname,'../index.html')
        })
    ]
}
⑦cmd: webpack  --config build/webpack.base.conf.js

三、实时编译文件

⑧安装中间件 cmd:npm install webpack-dev-middleware --save-dev
  npm install express --save-dev
⑨创建文件
--build
   --dev-server.js 
//引入依赖模块
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.conf');
var port = 8888;

var app = express();

var compiler = webpack(config);

var devMiddleware = require('webpack-dev-middleware')(compiler,{
    publicPath:config.output.publicPath,
    stats:{
        color:true,
        chunk:false
    }
})

app.use(devMiddleware)

app.listen(port,function(err){
    console.log('listen');
})
⑩ 创建文件
--build
   --webpack.dev.conf.js 
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');


var config = require('./webpack.base.conf');

//引入webpack.base.conf.js, 在此文件修改配置

config.output.publicPath = '/';

config.plugins = [
    new HtmlWebpackPlugin({
        filename:'index.html',
        template:path.resolve(__dirname,'../index.html'),
        inject:true
    })
]

module.exports = config;
⑪cmd: node build/dev-server.js  //监听文件变化，实时编译

四、热加载，自动刷新浏览器
⑫ cmd: npm install webpack-hot-middleware --save-dev
⑬ webpack.dev.conf.js中增加插件
var webpack = require('webpack');
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

⑭dev-server.js
var hotMiddleware = require('webpack-hot-middleware')(compiler)
app.use(hotMiddleware);

⑮webpack.dev.conf.js
var devClient = 'webpack-hot-middleware/client';

Object.keys(config.entry).forEach(function(name,i){
    var extras = [devClient];
    config.entry[name] = extras.concat(config.entry[name])
})

⑯cmd: node build/dev-server.js

五、监听html文件变化
⑰dev-server.js
compiler.plugin('compilation',function(compilation){
    compilation.plugin('html-webpack-plugin-after-emit',function(data,cb){
        hotMiddleware.publish({action:'reload'});
        cb();
    })
})

⑱修改webpack.dev.conf.js
// var devClient = 'webpack-hot-middleware/client';
var devClient = './build/dev-client';

⑲ 创建文件
--build
   --dev-client.js 
var hotClient = require('webpack-hot-middleware/client');

hotClient.subscribe(function(event){
    if(event.action === 'reload'){
        window.location.reload(true);
    }
})






ending
