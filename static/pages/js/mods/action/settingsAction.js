'use strict';
import fetch from 'isomorphic-fetch';
import ActionTypes from './actionTyps';
import {url} from '../data/constant';

function reqUpdateAnjukeMenu() {
    return {type: ActionTypes.ANJUKE_CITY_MENU_UPDATE_REQUEST}
}
function reqUpdateAnjukeMenuSucc() {
    return {type: ActionTypes.ANJUKE_CITY_MENU_UPDATE_SUCCESS}
}
function reqUpdateAnjukeMenuFail() {
    return {type: ActionTypes.ANJUKE_CITY_MENU_UPDATE_FAILUTRE}
}
function reqUpdateAnjukeMenuRest(){
    return {
        type:ActionTypes.ANJUKE_CITY_MENU_UPDATE_REST
    }
}

exports.sendMenuData = (_url) => {
    return function(dispatch) {
        dispatch(reqUpdateAnjukeMenu());
        fetch(url + '/api/getSubAreaByUrl/' + encodeURIComponent(_url)).then(function(result) {
            return result.json();
        }).then(function(result) {
            if (result.state === 'success') {
                dispatch(reqUpdateAnjukeMenuSucc());
            } else {
                dispatch(reqUpdateAnjukeMenuFail());
            }
            setTimeout(function(){
                dispatch(reqUpdateAnjukeMenuRest());
            },200);
        }, function(err) {
            dispatch(reqUpdateAnjukeMenuFail());
            setTimeout(function(){
                dispatch(reqUpdateAnjukeMenuRest());
            },200);
        });
    }
};
exports.changeUrlAction = (url)=> {
    return {
        type: ActionTypes.ANJUKE_CITY_MENU_UPDATE_CHANGE,
        url: url
    }
}
