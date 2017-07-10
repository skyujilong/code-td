'use strict';
import {url} from '../data/constant';
import ActionTypes from './actionTyps';
import fetch from 'isomorphic-fetch';

function reqAnjukeMenu(){
    return {
        type:ActionTypes.ANJUKE_CITY_MENU_REQUEST
    }
}

function reqAnjukeMenuSuccess(res){
    return {
        type:ActionTypes.ANJUKE_CITY_MENU_SUCCESS,
        data:res
    }
}

function reqAnjukeMenufail(res){
    return {
        type:ActionTypes.ANJUKE_CITY_MENU_FAILURE,
        data:res
    }
}

exports.initAnjukeMenu = () => {
    return (dispatch) => {
        dispatch(reqAnjukeMenu());
        //dispatch 请求中
        //获取 menu 并且发送dispatch 修改 state状态
        fetch(url + '/api/getAnjukeMenu').then(function(res){
            return res.json();
        }).then(function(res) {
            dispatch(reqAnjukeMenuSuccess(res));
        }, function(err) {
            dispatch(reqAnjukeMenufail(err));
        });
    }
};

exports.changeMenuSelectState = (cityId,subAreaName,subSubAreaName) => {
    return {
        type:ActionTypes.ANJUKE_CITY_MENU_UPDATE_CHANGE,
        data:{
            cityId:cityId,
            subAreaName:subAreaName,
            subSubAreaName:subSubAreaName
        }
    }
}
