'use strict';
const dbHandler = require('../../db/db');

exports.getInfo = function * (cityId, subSubAreaName) {
    let db = yield dbHandler.getDb();
    let result = yield db.collection('area').find({
        cityId: new dbHandler.ObjectID(cityId), 
        subSubAreaName: subSubAreaName
    }).toArray();
    db.close();
    return result;
};
