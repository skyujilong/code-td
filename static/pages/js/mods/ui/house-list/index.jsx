'use strict';
import React from 'react';
import {Layout, Menu, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
import {connect} from 'react-redux';
// import '../house-chart/index.jsx';
import Loading from '../loading/index';
import HouseMenu from '../house-menu/index.jsx';
class HouseIndex extends React.Component {
    render() {
        //方法均是 从props中取出来的
        const {value,onIncreaseClick} = this.props;
        return (
            <Layout>

                <Sider width={200} style={{background:'#fff'}}>
                        {/* <Menu mode="inline" onClick={this.checkMenu} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{height:'100%'}}>
                            <SubMenu key="sub1" title={<span><Icon type="filter" />成都</span>}>
                                <Menu.Item key="1">
                                    双流
                                </Menu.Item>
                                <Menu.Item key="2">
                                    高新区
                                </Menu.Item>
                            </SubMenu>
                        </Menu> */}
                        <HouseMenu/>
                </Sider>
                <Layout>
                    <Content style={{'marginLeft':'20px'}}>
                        {/* <span>{value}</span> */}
                        {/* <button onClick={(e)=>{onIncreaseClick(e)}}>点击我自增长</button> */}
                        <Loading/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
    checkMenu(e){
        console.log(e);
    }
}

// 映射 state to prop 上
function mapStateToProps(state){
    return {
        value : state.counter.count
    }
}
const increaseAction = { type: 'increase' };
//映射 ，那些方法会触发 dispatch 方法
function mapDispatchToProps(dispatch){
    return {
        onIncreaseClick: () => dispatch(increaseAction)
    }
}
//绑定方法，将两个映射方法绑定到 ui上面，会生成一个 contont ui
export default connect(mapStateToProps,mapDispatchToProps)(HouseIndex);
