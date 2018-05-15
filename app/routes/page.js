// page 相关api

import { Router } from "express";
var router = Router();

import Page from '../../models/page.js';

var resBody = {};

// 通用中间件
router.use((req, res, next) => {
    resBody = {
        code: 200,
        message: "ok",
        data: {}
    };
    next();
});

router.get('/page', (req, res, next) => {
    res.send("nihao 主页");
});

// 写入一个页面
router.post('/page/add', (req, res, next) => {
    var body = JSON.parse(Object.keys(req.body)[0]);// TODO: FIXME: req.body
    console.log('req.body start------------------')
    console.log(body)
    console.log('req.body end------------------')
    if(!body.config) {
        resBody.code = 500;
        resBody.message = "请求参数不完整:config";
        res.json(resBody);
    } else if(!body.fromId) {
        resBody.code = 500;
        resBody.message = "请求参数不完整:fromId";
        res.json(resBody);
    } else if(!body.title) {
        resBody.code = 500;
        resBody.message = "请求参数不完整:title";
        res.json(resBody);
    } else {
        var page = {};
        page.config = body.config;
        page.fromId = body.fromId;
        page.title = body.title;
        page.url = `http://wxapp.com/${Date.now()}`;
        page.metas = '[]';
        if(body.id) {
            page.id = body.id;
        } else {
            page.id = '' + Date.now();
        }
        console.log(page);
		var pageModel = new Page(page);//page, false
		/*pageModel.$__save(page, (err, page) => {
			if(err) { console.log(err) }
			console.log('...');
            console.log(page);
            
            resBody.message = '添加成功!';
            resBody.data = page;
            res.json(resBody);
		});*/
        pageModel.save().then((page) => { // FIXME: page.save() 最终没有resolve??? 
            console.log('...');
            console.log(page);
            
            resBody.message = '添加成功!';
            resBody.data = page;
            res.json(resBody);
        });
    }
});

export default router