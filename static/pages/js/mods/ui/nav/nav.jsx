'use strict';
import React from 'react';
import {Row,Col} from 'antd';

class Nav extends React.Component {
    render(){
        return (
            <nav>
                <Row gutter={16}>
                    <Col span={6}><div>房产</div></Col>
                    <Col span={6}><div>租房</div></Col>
                    <Col span={6}><div>其他</div></Col>
                </Row>
            </nav>
        );
    }
}

export default Nav;
