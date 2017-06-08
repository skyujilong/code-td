'use strict';
const logger = require('koa-logger');
const koa = require('koa');
const app = koa();
const router = require('./router/router.js');
const serve = require('koa-static');
const path = require('path');
const send = require('koa-send');
//中间件配置位置
app.use(logger());
app.use(serve(path.resolve(__dirname ,'..','static','test')));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log('server start on: http://localhost:3000');
});
