'use strict';

import rootReducer from '../reducers/main.js';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
let store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default store;
if (module.hot) {
    console.log(store.getState());
    module.hot.accept('../reducers/main.js', () => {
        const nextRootReducer = require('../reducers/main.js');
        store.replaceReducer(nextRootReducer, applyMiddleware(ReduxThunk));
    });
}
