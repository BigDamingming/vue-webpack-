/**
 * Created by damingming on 2017/11/1.
 */
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

var hotMiddleware = require('webpack-hot-middleware')(compiler)

compiler.plugin('compilation',function(compilation){
    compilation.plugin('html-webpack-plugin-after-emit',function(data,cb){
        hotMiddleware.publish({action:'reload'});
        cb();
    })
})


app.use(devMiddleware)

app.use(hotMiddleware);



app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('listening at http://localhost:'+port);
})