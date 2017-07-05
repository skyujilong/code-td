'use strict';
import Immutable from 'immutable';
import ActionTypes from '../action/actionTyps';
let initState = Immutable.fromJS([]);
export default function anjukeCityChart(state = initState, action) {
    switch (action.type) {
        case ActionTypes.ANJUKE_CITY_PRICE_REQUEST:
            return Immutable.fromJS([]);
        case ActionTypes.ANJUKE_CITY_PRICE_SUCCESS:
            return Immutable.fromJS(action.data);
        case ActionTypes.ANJUKE_CITY_PRICE_FAILUTRE:
            return Immutable.fromJS(action.data);
        default:
            return Immutable.fromJS([]);
    }
}
