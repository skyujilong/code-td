'use strict';
/**
 * [description]
 * @param  {String} name task名字
 * @param  {Function} cb   回调函数
 * @param  {[type]}   startTime 23:59
 * @param  {Number}   delayTime 单位ms
 * @return {[type]}        [description]
 */
function task(name, cb, startTime, delayTime) {
    let startDelay = getStartTaskRunDelay(startTime);
    var startIde = setTimeout(function() {
        console.log('task[%s] start>>>>>>>>>>>>',name);
        cb();
        clearTimeout(startIde);
        setInterval(function(){
            console.log('task[%s] start>>>>>>>>>>>>',name);
            cb();
        },delayTime);
    }, startDelay);
};


function getStartTaskRunDelay(time) {
    let currentTime = new Date();
    let timeInfo = time.match(/\d+/g);
    let hours = timeInfo[0] - 0;
    let minute = timeInfo[1] - 0;
    let currentHours = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();
    if (minute - currentMinute < 0) {
        hours -= 1;
        minute += 60;
    }
    if (hours - currentHours < 0) {
        //当前时间大于要执行的时间，只能明天执行了
        hours += 24;
    }

    return (hours - currentHours) * 60 * 60 * 1000 + (minute - currentMinute) * 60 * 1000;
}

module.exports = task;
