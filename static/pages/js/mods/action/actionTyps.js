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
        'ANJUKE_CITY_MENU_UPDATE_CHANGE'
    ];
    let map = {};
    for(let val of typeList){
        map[val] = val;
    }
    return map;
})();


export default ActionTypes;
