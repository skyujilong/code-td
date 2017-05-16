'use strict';
const router = require('koa-router')();
const req = require('../util/req.js');
const cheerio = require('cheerio');
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
router.get('/', function*(next) {
    this.body = 'hello world';
    yield next;
});

router.get('/taskReq',function*(next){
    let content = yield req('http://news.ifeng.com/a/20170514/51089860_0.shtml');
    this.body = content[1];
    yield next;
});

router.get('/analysisProxy',function*(next){
    let url = 'http://proxy.mimvp.com/free.php?proxy=in_tp&sort=&page=1';
    let content = yield req(url);
    let $ = cheerio.load(content[1],{decodeEntities: false});
    // let buf = Buffer.from($('#list table').html(),'utf-8');
    // this.body = decoder.write(buf);
    // this.body = $('#list table').html();
    let data = $('#list table').html();
    //TODO 正则表达式
    /<th[^<\/th]+<\/th>/
    this.body = 'doing...........'
    yield next;
});

module.exports = router;
