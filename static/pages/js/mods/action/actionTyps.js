'use strict';

const ActionTypes = (()=>{
    let typeList = [
        // 安居客 城市菜单请求 action
        'ANJUKE_CITY_MENU_REQUEST',
        'ANJUKE_CITY_MENU_SUCCESS',
        'ANJUKE_CITY_MENU_FAILURE',
        //安居客 城市菜单settings
        'ANJUKE_CITY_MENU_UPDATE_REQUEST',
        'ANJUKE_CITY_MENU_UPDATE_SUCCESS',
        'ANJUKE_CITY_MENU_UPDATE_FAILUTRE',
        'ANJUKE_CITY_MENU_UPDATE_REST',
        'ANJUKE_CITY_MENU_UPDATE_CHANGE',
        //安居客 城市相关报表
        'ANJUKE_CITY_PRICE_REQUEST',
        'ANJUKE_CITY_PRICE_SUCCESS',
        'ANJUKE_CITY_PRICE_FAILUTRE'
    ];
    let map = {};
    for(let val of typeList){
        map[val] = val;
    }
    return map;
})();


export default ActionTypes;
