'use strict';

import rootReducer from '../reducers/main.js';
import {createStore} from 'redux';
let store = createStore(rootReducer);
export default store;
if (module.hot) {
    console.log(store.getState());
    module.hot.accept('../reducers/main.js', () => {
        const nextRootReducer = require('../reducers/main.js');
        store.replaceReducer(nextRootReducer);
    });
}
