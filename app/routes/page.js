// page 相关api

import { Router } from "express";
var router = Router();

import Page from '../../models/page.js';
import SERVICE_CODE from '../config/service_code_config.js';

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

let getReqBody = (req) => {
    let body = req.body;
    console.log('req.body start------------------')
    console.log(body)
    console.log('req.body end------------------')
    return body;
}

// 根据wx appId获取所有页面
router.post('/page/getByApp', (req, res, next) => {
    // var body = JSON.parse(Object.keys(req.body)[0]);// TODO: FIXME: req.body
    let body = getReqBody(req);
    if(!body.wxAppId) {
        Object.assign(resBody, SERVICE_CODE.SERVICE_INVALID_PARAMETER); // 参数错误
        res.json(resBody);
    } else {
        Page.find({ wxAppId: body.wxAppId }, 'id title isHomePage').then(pages => {
            Object.assign(resBody, SERVICE_CODE.SERVICE_SUCCESS);
            resBody.data = pages;
            res.json(resBody);
        });
    }
});

// 写入一个页面
router.post('/page/add', (req, res, next) => {
    let body = getReqBody(req);
    if(!body.config || !body.wxAppId || !body.title) {
        Object.assign(resBody, SERVICE_CODE.SERVICE_INVALID_PARAMETER); // 参数错误
        res.json(resBody);
    } else {
        var page = {};
        page.config = body.config;
        page.wxAppId = body.wxAppId;
        page.title = body.title;
        page.url = `http://wxapp.com/${Date.now()}`;
        page.metas = '[]';
        if(body.id) {
            page.id = body.id;
        } else {
            page.id = '' + Date.now();
        }
		var pageModel = new Page(page);
        pageModel.save().then((page) => {
            resBody.message = '添加成功!';
            resBody.data = page;
            Object.assign(resBody, SERVICE_CODE.SERVICE_SUCCESS);
            res.json(resBody);
        });
    }
});

router.post('/page/delete', (req, res, next) => {
    let body = getReqBody(req);
    if(!body.wxAppId || !body.id) {
        Object.assign(resBody, SERVICE_CODE.SERVICE_INVALID_PARAMETER); // 参数错误
        res.json(resBody);
    } else {
        let param = { wxAppId: body.wxAppId, id: body.id };
        Page.remove(param).then((/* err,  */data) => {
            // console.log('err:', err); // { ok: 1, n: 1 }
            // console.log('data:', data); 没有第二个参数
            if(!data || !data.n) {
                Object.assign(resBody, SERVICE_CODE.SERVICE_DBDAO_ERROR); // 数据库操作失败
                res.json(resBody);
            } else {
                Object.assign(resBody, SERVICE_CODE.SERVICE_SUCCESS);
                resBody.data = data;
                res.json(resBody);
            }
        });
    }
});



export default router