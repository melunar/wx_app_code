# wx_app_code
微信小程序组装配置系统_PC端 后端轻服务

## collections

### page: 页面

> 应用层通过fromId查询一批同源页面

0. fromId (外键id 暂时写死 string)
1. id (唯一id string)
2. url (生成的路由 string)
3. isHomePage (主页标识 bool)
4. title (页面名称 string)
5. config (页面配置 string(Object))
6. metas (组件及配置 string(Json Array))

## api



