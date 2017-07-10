'use strict';
import React from 'react';
import {Layout, Menu, Icon} from 'antd';
const {SubMenu} = Menu;
const {Content, Sider} = Layout;
import {connect} from 'react-redux';
import HouseChart from '../house-chart/index.jsx';
import Loading from '../loading/index';
import HouseMenu from '../house-menu/index.jsx';
class HouseIndex extends React.Component {
    componentWillMount(){
        console.log('houseIndex init...........');
        console.log(this.props.match);
    }
    componentWillReceiveProps(){

    }
    render() {
        //通过 this.props中的match对象
        //接受react-router中传递过来的数据
        let {match} = this.props;
        let {anjukeCityMenuSelectState} = this.props;

        console.log(anjukeCityMenuSelectState.toJS());
        //方法均是 从props中取出来的
        return (
            <Layout>
                <Sider width={200} style={{background:'#fff'}}>
                    <HouseMenu/>
                </Sider>
                <Layout>
                    <Content style={{'marginLeft':'20px'}}>
                        <HouseChart/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
    checkMenu(e){
        console.log(e);
    }
}

function mapStateToProps(state){
    return {
        anjukeCityMenuSelectState: state.get('anjukeCityMenuSelectState')
    };
}
function mapDispatchToProps(dispatch){
    return {
        houseMenuChange: (...rest) => {
            // dispatch()
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HouseIndex);
