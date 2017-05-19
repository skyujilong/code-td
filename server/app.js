'use strict';
const logger = require('koa-logger');
const koa = require('koa');
const app = koa();
const router = require('./router/router.js');
//中间件配置位置
app.use(logger())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('server start on: http://localhost:3000');
});
