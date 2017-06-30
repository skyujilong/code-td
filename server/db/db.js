'use strict';
const co = require('co');
const MongoClient = require('mongodb').MongoClient;
module.exports = {
    getDb: function() {
        return co(function*() {
            let db = yield MongoClient.connect('mongodb://localhost:27017/jilong5', {
                poolSize: 20
            });

            yield db.authenticate('jilong5', '123456');
            return db;
        });
    },
    ObjectID: require('mongodb').ObjectID
}
