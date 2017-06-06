'use strict';
import * as reducers from '../reducers/main.js';
import {createStore} from 'redux';
let store = createStore(reducers.counter);
export default store;
if(module.hot){
    module.hot.accept('../reducers/main.js',()=>{
        const nextRootReducer = require('../reducers/main.js');
        store.replaceReducer(nextRootReducer);
    });
}
