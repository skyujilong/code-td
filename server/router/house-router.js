'use strict';
const getSubSubAreaInfo = require('../buz/anjuke/getSubSubAreaInfo').getInfo;

module.exports = function(router){
    //获取安居客小区信息
    router.get('/api/getAjkAreaHouseInfo/:cityId/:subSubAreaName',function*(next){
        let cityId = this.params.cityId;
        let subSubAreaName = this.params.subSubAreaName;
        try{
            let result = yield getSubSubAreaInfo(cityId,subSubAreaName);
            this.body = this.body = JSON.stringify({
                'state': 'success',
                'code': 200,
                'result': result
            });
        }catch(e){
            this.body = this.body = JSON.stringify({
                'state': 'error',
                'code': 500,
                'result': {
                    'msg': '鬼知道发生了什么！'
                }
            });
        }
        yield next;
    });
};
