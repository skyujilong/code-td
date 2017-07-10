'use strict';
import Immutable from 'immutable';
import ActionTypes from '../action/actionTyps';
let initState = Immutable.fromJS([]);
export default function anjukeCityMenu(state = initState, action) {

    switch (action.type) {
        case ActionTypes.ANJUKE_CITY_MENU_REQUEST:
            return Immutable.fromJS([]);
        case ActionTypes.ANJUKE_CITY_MENU_SUCCESS:
            return state.merge(Immutable.fromJS(action.data.result.menuList));
        case ActionTypes.ANJUKE_CITY_MENU_FAILURE:
            return Immutable.fromJS([]);
        default:
            return state;
    }
}

let initSelectState = Immutable.fromJS({
    cityId:'5938c9ec025c925a5cc2f371',
    subAreaName:'北京周边',
    subSubAreaName:'涿州'
});

export function anjukeCityMenuSelectState(state = initSelectState,action) {
    switch (action.type) {
        case ActionTypes.ANJUKE_CITY_SELECT_CHANGE:
            return Immutable.fromJS(action.data);
        default:
            return state;
    }
}
