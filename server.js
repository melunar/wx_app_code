'use strict'

import express from "express";
import routes from "./app/routes/index.js";
import mongoose from "mongoose";
import bodyparser from "body-parser"; //请求解析

// 引入mongo相关
import mongoDB from "mongodb";
var mongo = mongoDB.MongoClient;

import pageApi from "./app/routes/page.js";

var app = express();

//bodyParse设置 给request参数添加body属性 获取请求参数 response参数添加json方法相应请求
// 兼容数据格式:application/json类型接口
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/api/", pageApi);
mongoose.connect("mongodb://localhost:27017/wxapp",function(err, db) {
    if(err) {
        throw new Error('Database filed  to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }
    
    // app.use和express.static将/public绑定到了/public
    app.use('/public', express.static(__dirname + '/public'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    
    routes(app, db); //.db('wxapp')

    // 监听3000 port
    app.listen(3000, () => {
        console.log('wxappsetting server is running on port 3000...');
    });
});