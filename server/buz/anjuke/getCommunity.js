'use strict';
const co = require('co');
const dbHandler = require('../../db/db');
const req = require('../../util/req.js');
const cheerio = require('cheerio');
const _ = require('lodash');
const Area = require('../../module/area');

function delay(time) {
    return function(fn) {
        setTimeout(function() {
            fn();
        }, time);
    };
}

/**
 * 获取小区房源平均价检测
 *  eg url:https://beijing.anjuke.com/community/changping/
 */

/**
 * 根据列表数据，抓取数据后存入数据库
 * @param  {[type]}    list [description]
 */
function getCommunity() {
    console.log('获取小区报价task开始>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    co(function * () {
        let db = yield dbHandler.getDb();
        let infos = yield db.collection('city').find().toArray();
        yield db.close();
        let queue = getQueue(infos);
        yield deQueue(queue);
    }).then(function() {
        console.log('获取小区报价task结束<<<<<<<<<<<<<<<<<<<<<<<<<');
    }).catch(function(e) {
        console.log(e.stack);
    });
};

function * deQueue(queue) {
    let start1 = new Date().getTime();
    yield insertDb(queue[0]);
    let end1 = new Date().getTime();
    let delayTime = 60 * 60 * 1000 * 2; //二小时后执行后半部分
    console.log('part01执行时间：' + (end1 - start1) + 'ms');
    //延迟执行函数
    yield delay(delayTime);
    let start2 = new Date().getTime();
    yield insertDb(queue[1]);
    let end2 = new Date().getTime();
    console.log('part02执行时间：' + (end2 - start2) + 'ms');
    console.log('task执行总时间为：' + (end2 - start1) + 'ms');
}

function * insertDb(list) {
    for (let item of list) {
        // 每个item都是一个页面的相关信息
        let insertDBQueue = [];
        let delayTime = Math.ceil(Math.random() * 5000);
        //延迟执行函数
        yield delay(delayTime);
        let content = yield req(item.url);

        let $ = cheerio.load(content[1], {decodeEntities: false});
        //DOM分析
        $('body .li-itemmod').each(function() {
            let area = new Area();
            area = _.merge(area, {
                // 城市id
                cityId: item.rootId,
                // 城市名字
                cityName: item.rootAreaName,
                // 城市区名
                subAreaName: item.subAreaName,
                // 城市区下的名字
                subSubAreaName: item.subSubAreaName,
                name: _.trim($(this).find('.li-info h3 a').text()),
                addr: _.trim($(this).find('address').text()),
                priceInfo: [
                    {
                        price: $(this).find('.li-side').find('strong').text() - 0,
                        time: new Date().getTime(),
                        quantity: $(this).find('.bot-tag').children('span').find('a').text().match(/\d+/)[0] - 0
                    }
                ]
            });
            insertDBQueue.push(area);
        });
        // 数据入库操作
        let db = yield dbHandler.getDb();
        for(let area of insertDBQueue){
            let info = yield db.collection('area').findOneAndUpdate({
                name: area.name
            }, {
                $set: {
                    cityId: area.cityId,
                    cityName: area.cityName,
                    subAreaName: area.subAreaName,
                    subSubAreaName: area.subSubAreaName,
                    addr: area.addr
                },
                $push: {
                    priceInfo: {
                        $each: area.priceInfo
                    }
                }
            }, {upsert: true});
            console.log([area.cityName, '-', area.subSubAreaName, '-', area.name].join('') + 'done.................');
        }
        db.close();
    }

}

/**
 * 拆分成城市抓取
 * @param  {[type]} infos [description]
 * @return {[type]}       [description]
 */
function getQueue(infos) {

    let list = [
        [], []
    ];
    _.each(infos, (rootArea) => {
        _.each(rootArea.subArea, (subArea) => {
            _.each(subArea.subArea, (subSubArea) => {

                if (/(北京|上海|大连|成都)/.test(rootArea.name)) {
                    list[0].push({rootId: rootArea._id, rootAreaName: rootArea.name, subAreaName: subArea.name, subSubAreaName: subSubArea.name, url: subSubArea.anjukeUrl});
                } else {
                    list[1].push({rootId: rootArea._id, rootAreaName: rootArea.name, subAreaName: subArea.name, subSubAreaName: subSubArea.name, url: subSubArea.anjukeUrl});
                }
            });
        });
    });
    return list;
}
getCommunity();
/**
* 直接返回
* @param  {[type]}    list [description]
* @return {function}      [description]
*/
exports.getCommunity = getCommunity;
