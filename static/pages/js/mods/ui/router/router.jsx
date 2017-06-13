'use strict';
import React from 'react';

import {BrowserRouter, Link, Route} from 'react-router-dom';
// import {Hello} from '../wrap-container/index';
import HouseIndex from '../house-list/index';
import Settings from '../settings/index';
import {Layout} from 'antd';
import Nav from '../nav/nav';
const {Header, Content} = Layout;
//TODO 页面级的，因此这个是需要放在最外侧
const Router = () => {
    return (
            <BrowserRouter>
                <Layout>
                    <Header>
                        <Nav></Nav>
                    </Header>
                    <Layout>
                        <Route exact path="/" component={HouseIndex}></Route>
                        <Route path="/house/:shengId/:area1/:area2" component={HouseIndex}/>
                        <Route path="/setting/:menuKey?" component={Settings}/>
                    </Layout>
                </Layout>
            </BrowserRouter>
    )
}
export default Router;
