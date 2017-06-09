'use strict';
import {combineReducers} from 'redux';

import anjukeCityMenu from './anjukeCityMenu';

console.log(anjukeCityMenu);

function counter(state = {
    count: 0
}, action) {
    const count = state.count;
    switch (action.type) {
        case 'increase':
            return {
                count: count + 1
            };
        default:
            return state;
    }
}
const rootReducer = combineReducers({anjukeCityMenu,counter});
export default rootReducer;
