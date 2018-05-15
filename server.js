'use strict'
var a = 1;

import express from "express";
import routes from "./app/routes/index.js";

// 引入mongo相关
import mongoDB from "mongodb";
var mongo = mongoDB.MongoClient;

var app = express();

// routes(app); // 注入路由

/* app.get('/', (req, res) => {
    res.send('Hello express');
});

app.get('/index', (req, res) => {
    res.sendFile(process.cwd() + '/index.html');
}); */



mongo.connect('mongodb://localhost:27017', (err, db) => {
    if(err) {
        throw new Error('Database filed  to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }
    
    // app.use和express.static将/public绑定到了/public
    app.use('/public', express.static(__dirname + '/public'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    
    routes(app, db.db('wxapp'));

    // 监听3000 port
    app.listen(3000, () => {
        console.log('Listening on port 3000...');
    });
});