'use strict';
import React from 'react';
import {Layout, Menu, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class HouseIndex extends React.Component {
    render() {
        return (
            <Layout>
                <Sider width={200} style={{background:'#fff'}}>
                        <Menu mode="inline" onClick={this.checkMenu} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{height:'100%'}}>
                            <SubMenu key="sub1" title={<span><Icon type="filter" />成都</span>}>
                                <Menu.Item key="1">
                                    双流
                                </Menu.Item>
                                <Menu.Item key="2">
                                    高新区
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                </Sider>
                <Content style={{'marginLeft':'20px'}}>hello world</Content>
            </Layout>
        );
    }
    checkMenu(e){
        console.log(e);
    }
}

export default HouseIndex;
