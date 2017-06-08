'use strict';
const co = require('co');
const dbHandler = require('../../db/db');
// const thunkify = require('thunkify');
// const delay = thunkify(setTimeout);
const req = require('../../util/req.js');
const cheerio = require('cheerio');
const _ = require('lodash');


function delay(time){
    return function(fn){
        setTimeout(function(){
            fn();
        },time);
    };
}

/**
 * 根据给定的地址列表去获取 对应的区域信息
 * @param  {Srtring} cityName 城市名字
 * @param  {[type]} list [description]
 * @return {[type]}      [description]
 */
function taskInitCityArea(cityName, list) {
    // setTimeout(function(){},300);
    co(function * () {
        let info = {
            name: cityName,
            subArea: []
        };
        for (let url of list) {
            let delayTime = Math.ceil(Math.random() * 10000);
            //延迟执行函数
            yield delay(delayTime);

            let content = yield req(url);
            let $ = cheerio.load(content[1], {decodeEntities: false});
            let areaName = _.trim($('.elems-l').eq(0).find('.selected-item').eq(0).text());
            let areaInfo = {
                name: areaName,
                subArea: []
            };
            $('body .sub-items a').each(function() {
                let areaName = $(this).data('id');
                if (areaName && areaName.indexOf('全部') === -1) {
                    areaInfo.subArea.push({name: areaName, anjukeUrl: $(this).attr('href')})
                }
            });

            let db = yield dbHandler.getDb();
            let dbInfo = yield db.collection('city').findOneAndUpdate({
                'name': cityName
            }, {
                '$push': {
                    'subArea': areaInfo
                }
            }, {'upsert': true});
            db.close();
        }
        return cityName + '>>>>>>>>>>抓取完毕----------------------------';
    }).then(function(data){
        console.log(data);
    }).catch(function(e){
        console.log(e);
    });
}

module.exports = taskInitCityArea;
