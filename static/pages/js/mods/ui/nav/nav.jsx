'use strict';
import React from 'react';
import {Row,Col} from 'antd';
import './scss/nav.scss';
class Nav extends React.Component {
    render(){
        return (
            <nav className={'top-nav'}>
                <Row gutter={16}>
                    <Col span={6}><div className={'logo'}>CODE-TD</div></Col>
                    <Col span={4}><div className={'item active'}>房产</div></Col>
                    <Col span={4}><div className={'item'}>租房</div></Col>
                    <Col span={4}><div className={'item'}>设置</div></Col>
                </Row>
            </nav>
        );
    }
}

export default Nav;
