'use strict';
import 'react-hot-loader/patch';
import Router from '../router/router.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import * as reducers from '../../reducers/main.js';
import store from '../../data/store.js';

const render = (Component) => {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer>
                <Component/>
            </AppContainer>
        </Provider>,
        document.getElementById('wrap-container'));
};
render(Router);
// Hot Module Replacement API
if (module.hot) {
    module.hot.accept(() => {
        render(Router);
    });
}
