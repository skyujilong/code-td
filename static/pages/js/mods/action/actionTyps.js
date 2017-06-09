'use strict';

const ActionTypes = (()=>{
    let typeList = [
        // 安居客 城市菜单请求 action
        'ANJUKE_CITY_MENU_REQUEST',
        'ANJUKE_CITY_MENU_SUCCESS',
        'ANJUKE_CITY_MENU_FAILURE'
    ];
    let map = {};
    for(let val of typeList){
        map[val] = val;
    }
    return map;
})();


export default ActionTypes;
