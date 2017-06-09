'use strict';
import React from 'react';
import {connect} from 'react-redux';
import Loading from '../loading/index';
import {Layout, Menu, Icon} from 'antd';
const {Sider} = Layout;
const {SubMenu} = Menu;

class HouseMenu extends React.Component {
    render() {
        //TODO 添加初始化组件的时候 获取menu
        let {anjukeCityMenu} = this.props;
        return (
            <Menu mode="inline" onClick={this.checkMenu} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{height:'100%'}}>
                 {anjukeCityMenu.size !== 0  && anjukeCityMenu.forEach((val)=>{

                 })}
                 {anjukeCityMenu.size === 0 && <Loading/>}
            </Menu>
        );
    }
    checkMenu(e){
        console.log(e);
    }
}
function mapStateToProps(state){
    return {
        anjukeCityMenu: state.anjukeCityMenu
    }
}
function mapDispatchToProps(dispatch){
    return {
        dispatchRequest: ()=>{
            //TODO 请求
        },
        dispatchSuccess: ()=>{

        },
        dispatchFail: ()=>{

        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HouseMenu);
