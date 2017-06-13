'use strict';
import {combineReducers} from 'redux-immutablejs';

import anjukeCityMenu from './anjukeCityMenu';
import settings from './settings';
const rootReducer = combineReducers({anjukeCityMenu,settings});
export default rootReducer;
