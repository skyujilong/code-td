'use strict';
import React from 'react';
import {Layout, Menu, Icon} from 'antd';
const {SubMenu} = Menu;
const {Content, Sider} = Layout;
import {connect} from 'react-redux';
// import '../house-chart/index.jsx';
import Loading from '../loading/index';
import HouseMenu from '../house-menu/index.jsx';
class HouseIndex extends React.Component {
    render() {
        //通过 this.props中的match对象
        //接受react-router中传递过来的数据
        let {match} = this.props;
        console.log(match);
        //方法均是 从props中取出来的
        return (
            <Layout>
                <Sider width={200} style={{background:'#fff'}}>
                    <HouseMenu/>
                </Sider>
                <Layout>
                    <Content style={{'marginLeft':'20px'}}>
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

export default HouseIndex;
