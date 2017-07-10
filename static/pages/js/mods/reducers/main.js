'use strict';
import {combineReducers} from 'redux-immutablejs';

import anjukeCityMenu from './anjukeCityMenu';
import {anjukeCityMenuSelectState} from './anjukeCityMenu';
import settings from './settings';
import anjukeCityChart from './anjukeChart';
const rootReducer = combineReducers({anjukeCityMenu,settings,anjukeCityChart,anjukeCityMenuSelectState});
export default rootReducer;
