'use strict';
const logger = require('koa-logger');
const koa = require('koa');
const app = koa();
const router = require('./router/router.js');
const serve = require('koa-static');
const path = require('path');
const send = require('koa-send');
const task = require('./util/task.js');
const getCommunity = require('./buz/anjuke/getCommunity');
//中间件配置位置
app.use(logger());
app.use(serve(path.resolve(__dirname ,'..','static','test')));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    //TODO start task
    console.log('server start on: http://localhost:3000');
    task('安居客房价获取',function(){
        getCommunity();
    },'18:00',24*60*60*1000);
    // getCommunity();
});
