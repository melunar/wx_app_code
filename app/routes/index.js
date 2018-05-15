'use strict';

var ClickHandler = require(process.cwd() + '/app/controllers/click_handler.server.js').default;
// import ClickHandler from '../app/controllers/click_handler.server.js';

/**
 * 注册路由
 * @param {object} app express对象
 * @param {object} db 数据库对象
 */
export default function(app, db) {
    var clickHandler =  new ClickHandler(db);

    app.route('/').get((req, res) => {
        res.sendFile(process.cwd() + '/public/index.html');
    });

    app.route('/api/clicks')
        .get(clickHandler.getClicks)
        .post(clickHandler.addClick)
        .delete(clickHandler.resetClicks);
}