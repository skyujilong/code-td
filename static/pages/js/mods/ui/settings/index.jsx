'use strict';
import React from 'react';
import {Layout, Menu, Icon} from 'antd';
const {SubMenu} = Menu;
const {Content, Sider} = Layout;
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import AnjukeMenuSettings from './anjukeMenu';
class Settings extends React.Component {
    render() {
        let {match} = this.props;
        let menuKey = match.params.menuKey || '1';
        let defaultSelectKeys = [menuKey];
        return (
            <Layout>
                <Sider width={200} style={{background:'#fff'}} >
                    <Menu mode="inline" style={{height:'100%'}} defaultSelectedKeys={defaultSelectKeys} defaultOpenKeys={['sub1']}>
                        <SubMenu key="sub1" title={'选项'}>
                            <Menu.Item key={'1'}>安居客菜单</Menu.Item>
                            <Menu.Item key={'2'}>其他</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Content>
                    <div style={{paddingLeft:20,paddingTop:30,background:'#fff',height:'100%'}}>
                        <Route exact path="/setting" component={AnjukeMenuSettings}/>
                        <Route exact path="/setting/anjukeMenu" render={()=>{
                            return (
                                <div>hello anjuke menu</div>
                            )
                        }}/>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default Settings;
