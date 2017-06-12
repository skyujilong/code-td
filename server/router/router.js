'use strict';
const router = require('koa-router')();
const req = require('../util/req.js');
const cheerio = require('cheerio');
const _ = require('lodash');
const dbHandler = require('../db/db.js');
const Area = require('../module/area.js');
const co = require('co');
const getCityAndAreaTask = require('../buz/anjuke/getCityAndArea');

router.get('/', function * (next) {
    this.body = 'hello world';
    yield next;
});

router.get('/taskReq', function * (next) {
    let content = yield req('http://news.ifeng.com/a/20170514/51089860_0.shtml');
    this.body = content[1];
    yield next;
});

router.get('/analysisProxy', function * (next) {
    let url = 'http://proxy.mimvp.com/free.php?proxy=in_tp&sort=&page=1';
    let content = yield req(url);
    let $ = cheerio.load(content[1], {decodeEntities: false});
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
            ipInfoList.push({ip: ip, port: ''});
        } else if (currentIndex === 2) {
            let port = regCotent.exec(val)[1];
            _.last(ipInfoList).port = port;
        }
        currentIndex++;
        if (currentIndex === count) {
            currentIndex = 0;
        }
    }
    this.body = require('util').inspect(ipInfoList, {depth: null});
    yield next;
});

router.get('/analysisChengDu', function * (next) {
    let objectId = new dbHandler.ObjectID('591e839bbbbd6bf59b14401b');
    let url = 'https://chengdu.anjuke.com/community/shuangliu/';
    let content = yield req(url);
    let $ = cheerio.load(content[1], {decodeEntities: false});
    let list = [];
    let db = yield dbHandler.getDb();

    // console.log($('body .li-itemmod'));
    $('body .li-itemmod').each(function() {
        let area = new Area();
        area = _.merge(area, {
            cityId: objectId,
            name: _.trim($(this).find('.li-info h3 a').text()),
            cityArea: '双流',
            addr: _.trim($(this).find('address').text()),
            priceInfo: [
                {
                    price: $(this).find('.li-side').find('strong').text(),
                    time: new Date().getTime(),
                    upDownRate: $(this).find('.price-txt').text()
                }
            ]
        });
        list.push(area);
    });

    for (let area of list) {
        let info = yield db.collection('area').findOneAndUpdate({
            name: area.name
        }, {
            $push: {
                priceInfo: {
                    $each: area.priceInfo
                }
            }
        }, {upsert: true});
    }

    db.close();
    this.body = 'get chengdu data end;';
    yield next;
});
/**
 * 抓取地名与对应的小区url地址
 * eg:
 * http://test.sina.com.cn:3000/api/getSubAreaByUrl/https%3A%2F%2Fchengdu.anjuke.com%2Fcommunity%2Fshuangliu%2F
 * @type {Array}
 */
router.get('/api/getSubAreaByUrl/:url/', function * (next) {

    let url = this.params.url;
    let content = yield req(url);
    let $ = cheerio.load(content[1], {decodeEntities: false});
    let cityName = _.trim($('.city-view').text()).replace(/[^\u4e00-\u9fa5]/g, '');
    let urlList = [];
    $('.elems-l').eq(0).children('a').each(function() {
        let areaName = _.trim($(this).text());
        if (areaName.indexOf('全部') === -1) {
            urlList.push(_.trim($(this).attr('href')));
        }
    });
    getCityAndAreaTask(cityName, urlList);
    this.body = JSON.stringify(urlList);
    yield next;
});
/**
 * 查询安居客菜单
 * @type {[type]}
 */
router.get('/api/getAnjukeMenu/', function * (next) {
    const db = yield dbHandler.getDb();
    let menuData = yield db.collection('city').find({
        //TODO 后边取消掉这个选择，现在其他还没有数据
        name:'成都'
    }).toArray();
    db.close();
    this.body = JSON.stringify(menuData);
    yield next;
});

module.exports = router;
