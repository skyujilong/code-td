'use strict';
const router = require('koa-router')();
const req = require('../util/req.js');
const cheerio = require('cheerio');
const _ = require('lodash')
//正则标签匹配
const tagReg = /<(?:\/([^>]+)>)|<(?:([^\s\/>]*)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>\/])*)\/?>)/g;

router.get('/', function*(next) {
    this.body = 'hello world';
    yield next;
});

router.get('/taskReq', function*(next) {
    let content = yield req('http://news.ifeng.com/a/20170514/51089860_0.shtml');
    this.body = content[1];
    yield next;
});

router.get('/analysisProxy', function*(next) {
    let url = 'http://proxy.mimvp.com/free.php?proxy=in_tp&sort=&page=1';
    let content = yield req(url);
    let $ = cheerio.load(content[1], {
        decodeEntities: false
    });
    let data = $('#list thead').html();
    let reg = /<th[^>]*>[^<]*<\/th>/g;
    let count = data.match(reg).length;
    let currentIndex = 0;
    let ipInfoList = [];
    let ipContent = $("#list tbody").html();
    for (let val of ipContent.match(/<[^>]*>[^<]*<\/[^>]*>/g)) {
        let regCotent = />([^<])*<\//;
        if (currentIndex === 1) {
            let ip = regCotent.exec(val)[1];
            ipInfoList.push({
                ip: ip,
                port: ''
            });
        } else if (currentIndex === 2) {
            let port = regCotent.exec(val)[1];
            _.last(ipInfoList).port = port;
        }
        currentIndex++;
        if (currentIndex === count) {
            currentIndex = 0;
        }
    }
    this.body = require('util').inspect(ipInfoList, {
        depth: null
    });
    yield next;
});

router.get('/analysisChengDu',function*(next){
    let url = 'https://chengdu.anjuke.com/community/shuangliu/';
    let content = yield req(url);
    let $ = cheerio.load(content[1], {
        decodeEntities: false
    });
    // console.log($('body .li-itemmod'));
    $('body .li-itemmod').each(function(){
        console.log(_.trim($(this).find('address').text()));
        console.log(_.trim(
            $(this).find('.li-side').find('strong').text()
        ));
        console.log(
            _.trim(
                $(this).find('.price-txt').text()
            )
        );
    });

    // let $current = $('body .li-itemmod');

    this.body = $('body .li-itemmod').html();
    yield next;
});

module.exports = router;
