'use strict';
import React from 'react';
import {connect} from 'react-redux';
import Loading from '../loading/index';
import {Layout, Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
const {Sider} = Layout;
const {SubMenu} = Menu;
import {initAnjukeMenu} from '../../action/anjukeMenuAction';
class HouseMenu extends React.Component {
    //在挂载发生之前立即被调用
    componentWillMount() {
        //init 安居客menu
        this.props.initAnjukeMenu();
    }

    render() {
        //添加初始化组件的时候 获取menu
        let {anjukeCityMenu} = this.props;
        let menuList = anjukeCityMenu.toJS();
        return (
            <Menu mode="inline" onClick={this.checkMenu} defaultSelectedKeys={['创业路']} defaultOpenKeys={['593900c58ac7d6523154655a','高新']} style={{
                height: '100%'
            }}>
                {menuList.length !== 0 && menuList.map((val, index) => {
                    return (
                        <SubMenu key={val._id} title={< span > <Icon type="filter"/>{val.name} < /span>}>
                            {val.subArea.map((subVal) => {
                                return (
                                    <SubMenu key={subVal.name} title={subVal.name}>
                                        {subVal.subArea.map((subSubVal)=>{
                                            return (
                                                <Menu.Item key={subSubVal.name}>
                                                    <Link to={'/house/'+ val._id + '/' + subVal.name + '/' + subSubVal.name}>{subSubVal.name}</Link>
                                                </Menu.Item>
                                            )
                                        })}
                                    </SubMenu>
                                )
                            })}
                        </SubMenu>
                    )
                })}
                {anjukeCityMenu.size === 0 && <Loading/>}
            </Menu>
        );
    }
    checkMenu(e) {
        console.log('点击菜单');
        console.log(e);
    }
}
function mapStateToProps(state) {
    return {anjukeCityMenu: state.get('anjukeCityMenu')}
}
function mapDispatchToProps(dispatch) {
    return {
        initAnjukeMenu: () => {
            dispatch(initAnjukeMenu());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HouseMenu);
