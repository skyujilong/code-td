'use strict';
// 小区
class Area {
    constructor(_id, name, addr, cityId, priceInfo) {
        this._id = _id;
        this.name = name;
        this.addr = addr;
        this.cityId = cityId;
        //[{price,time}]
        this.priceInfo = priceInfo;
    }
}
module.exports = Area;
