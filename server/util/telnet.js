'use strict';
const co = require('co');
const telnet = require('telnet-client');

module.exports = function(ip, port) {
    return co(function*() {
        let connection = new telnet();
        try {
            yield connection.connect({
                host: ip,
                port: port,
                timeout: 1000
            });
        } catch (e) {
            return 0;
        }
    });
};
