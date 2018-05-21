/*
 * @Author: hooy
 * @Date: 2018-05-21 23:16:52
 * @LastEditors: hooy
 * @LastEditTime: 2018-05-21 23:17:15
 * @Description: page实例Schema定义
 * @Email: haoyong94520@outlook.com
 */

import mongoose from 'mongoose';  

export default new mongoose.Schema({
    wxAppId: String, //(假外键:微信appId 暂时写死植入 string)
    id: String, //(唯一id string)
    url: String, //(生成的路由 string)
    isHomePage: {
        type: Boolean,
        default: false
    }, //(主页标识 bool)
    title: String, //(页面名称 string)
    config: String, //(页面配置 string(Object))
    metas: String, //(组件及配置 string(Json Array))
});