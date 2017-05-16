'use strict';
const request = require('request');
const co = require('co');
const thunkify = require('thunkify');

module.exports = function(url, data, method) {
    return co(function*() {
        return yield thunkify(request)({
            url: url,
            form: data,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
                'x-client-data': 'CKe1yQEIjLbJAQijtskBCMS2yQEI95fKAQj6nMoBCKmdygEItp7KAQ ==',
                'pragma': 'no-cache',
                'accept-language': 'zh-CN,zh;q=0.8',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            },
            method: method || 'get'
            // proxy:'http://210.38.1.130:8080'
        });
    });
};
