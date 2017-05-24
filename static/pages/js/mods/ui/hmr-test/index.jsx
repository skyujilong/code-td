'use strict';
import 'react-hot-loader/patch';
import {Hello} from './../wrap-container';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

const render= (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('wrap-container'));
};
render(Hello);
// Hot Module Replacement API
if (module.hot) {
    module.hot.accept(() => {
        render(Hello);
    });
}
