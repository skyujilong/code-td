'use strict';
import {combineReducers} from 'redux-immutablejs';

import anjukeCityMenu from './anjukeCityMenu';
import settings from './settings';
import anjukeCityChart from './anjukeChart';
const rootReducer = combineReducers({anjukeCityMenu,settings,anjukeCityChart});
export default rootReducer;
