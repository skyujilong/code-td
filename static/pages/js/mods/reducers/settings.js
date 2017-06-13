'use strict';
import Immutable from 'immutable';
import ActionTypes from '../action/actionTyps';
let initState = Immutable.fromJS({
    anjukeMenuReqState: 3,
    url:''
});
// 下面的 会引发bug丢失 anjukeCityMenuSetting 层级
// let initState = Immutable.fromJS({
//     anjukeCityMenuSetting:{
//         anjukeMenuReqState: 1,
//         url:''
//     }
// });
export default function settings(state = initState, action) {
    switch (action.type) {
        case ActionTypes.ANJUKE_CITY_MENU_UPDATE_REQUEST:
            return state.set('anjukeMenuReqState', '0');
        case ActionTypes.ANJUKE_CITY_MENU_UPDATE_SUCCESS:
            return state.set('anjukeMenuReqState', '1');
        case ActionTypes.ANJUKE_CITY_MENU_UPDATE_FAILUTRE:
            return state.set('anjukeMenuReqState', '2');
        case ActionTypes.ANJUKE_CITY_MENU_UPDATE_REST:
            return state.set('anjukeMenuReqState', '3');
        case ActionTypes.ANJUKE_CITY_MENU_UPDATE_CHANGE:
            return state.set('url',action.url);
        default:
            return state;
    }
}
