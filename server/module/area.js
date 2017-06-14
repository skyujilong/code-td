'use strict';
// 小区
class Area {
    /**
     * 小区构建方法
     * @param  {[type]} _id       [description]
     * @param  {[type]} name      小区名字
     * @param  {[type]} cityName  城市名字
     * @param  {[type]} subAreaName 城市区名字
     * @param  {[type]} subSubAreaName 区下的街道名称
     * @param  {[type]} addr      具体地址
     * @param  {[type]} cityId    所属城市id
     * @param  {[type]} priceInfo 价格信息
     */
    constructor(_id, name, cityName, subAreaName, subSubAreaName, addr, cityId, priceInfo) {
        this._id = _id;
        this.name = name;
        this.cityName = cityName;
        this.subAreaName = subAreaName;
        this.subSubAreaName = subSubAreaName;
        this.addr = addr;
        this.cityId = cityId;
        //价格，时间，二手房数量
        //[{price,time,quantity}]
        this.priceInfo = priceInfo;
    }
}
module.exports = Area;
