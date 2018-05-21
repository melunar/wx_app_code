/*
 * @Author: hooy
 * @Date: 2018-05-22 00:26:41
 * @LastEditors: hooy
 * @LastEditTime: 2018-05-22 00:28:09
 * @Description: 页面相关接口
 * @Email: haoyong94520@outlook.com
 */

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
    console.log('req.body start->>>>>>>>>>>>')
    console.log(body)
    console.log('<<<<<<<<<<<<<<-req.body end')
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
// 设为主页
router.post('/page/set/homepage', (req, res, next) => {
    let body = getReqBody(req);
    if(!body.wxAppId || !body.id) {
        Object.assign(resBody, SERVICE_CODE.SERVICE_INVALID_PARAMETER); // 参数错误
        res.json(resBody);
    } else {
        let param = { wxAppId: body.wxAppId, id: body.id };
        Page.update({wxAppId: body.wxAppId}, {isHomePage: false}).then(() => {
            // 先把所有页面置为非首页,再把操作对象置为主页
            Page.findOneAndUpdate(param, {isHomePage: true}).then((newPage) => {
                Object.assign(resBody, SERVICE_CODE.SERVICE_SUCCESS); // OK
                newPage.isHomePage = true; // 更新实例
                resBody.data = newPage;
                res.json(resBody);
            }).catch(err => {
                Object.assign(resBody, SERVICE_CODE.SERVICE_DBDAO_ERROR); // 数据库操作失败
                res.json(resBody);
            });
        });
    }
});

// 更新一个页面
router.post('/page/update', (req, res, next) => {
    let body = getReqBody(req);
    if(!body.wxAppId || !body.id) {
        Object.assign(resBody, SERVICE_CODE.SERVICE_INVALID_PARAMETER); // 参数错误
        res.json(resBody);
    } else { // 修改
        let param = { wxAppId: body.wxAppId, id: body.id };
        Page.findOneAndUpdate(param, body).then((newPage) => {
            Object.assign(resBody, SERVICE_CODE.SERVICE_SUCCESS); // OK
            resBody.data = newPage;
            res.json(resBody);
        }).catch(err => {
            Object.assign(resBody, SERVICE_CODE.SERVICE_DBDAO_ERROR); // 数据库操作失败
            res.json(resBody);
        });
    }
});

// 删除一个页面
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