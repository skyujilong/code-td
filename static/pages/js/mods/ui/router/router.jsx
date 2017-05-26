'use strict';
import React from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import {Hello} from '../wrap-container/index';
//TODO 页面级的，因此这个是需要放在最外侧
const Router = () => {
    return (
        <BrowserRouter>
            <div>
                {/* TODO nav */}
                <ul>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/news">news</Link>
                    </li>
                </ul>
                <Route exact path="/" component={Hello}></Route>
                {/* TODO 注册底部的渲染内容Route */}
            </div>
        </BrowserRouter>
    )
}
export default Router;
