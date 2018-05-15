import mongoose from 'mongoose';

// 表结构
export default new mongoose.Schema({
    fromId: String, //(假外键id 暂时写死 string)
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