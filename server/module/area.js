'use strict';
// 小区
class Area {
    /**
     * 小区构建方法
     * @param  {[type]} _id       [description]
     * @param  {[type]} name      小区名字
     * @param  {[type]} cityArea  所属街道区域
     * @param  {[type]} addr      具体地址
     * @param  {[type]} cityId    所属城市id
     * @param  {[type]} priceInfo 价格信息
     */
    constructor(_id, name, cityArea, addr, cityId, priceInfo) {
        this._id = _id;
        this.name = name;
        this.cityArea = cityArea;
        this.addr = addr;
        this.cityId = cityId;
        //[{price,time}]
        this.priceInfo = priceInfo;
    }
}
module.exports = Area;
