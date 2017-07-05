'use strict';

export default function(fn, scope, delay) {
    var timer;
    return function() {
        var args = Array.prototype.slice.call(arguments);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            fn.apply(scope || null, args);
        }, delay);
    }
};
