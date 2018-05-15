'use strict'
var a = 1;

import express from "express";
import routes from "./app/routes/index.js";
var mongoose = require("mongoose");
import bodyparser from "body-parser"; //请求解析

// 引入mongo相关
import mongoDB from "mongodb";
var mongo = mongoDB.MongoClient;

import pageApi from "./app/routes/page.js";

var app = express();

// routes(app); // 注入路由

/* app.get('/', (req, res) => {
    res.send('Hello express');
});

app.get('/index', (req, res) => {
    res.sendFile(process.cwd() + '/index.html');
}); */

//bodyParse设置 给request参数添加body属性 获取请求参数 response参数添加json方法相应请求
app.use(bodyparser.urlencoded({extended: true}));

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
        console.log('Listening on port 3000...');
    });
});