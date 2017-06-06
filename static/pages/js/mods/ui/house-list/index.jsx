'use strict';
import React from 'react';
import {Layout, Menu, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
import {connect} from 'react-redux';
class HouseIndex extends React.Component {
    render() {
        const {value,onIncreaseClick} = this.props;
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
                <Content style={{'marginLeft':'20px'}}>
                    <span>{value}</span>
                    <button onClick={(e)=>{onIncreaseClick(e)}}>点击我自增长</button>
                </Content>
            </Layout>
        );
    }
    checkMenu(e){
        console.log(e);
    }
}

function mapStateToProps(state){
    return {
        value : state.count
    }
}

const increaseAction = { type: 'increase' };

function mapDispatchToProps(dispatch){
    return {
        onIncreaseClick: () => dispatch(increaseAction)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HouseIndex);
