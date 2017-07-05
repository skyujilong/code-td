'use strict';
import {url} from '../data/constant';
import ActionTypes from './actionTyps';
import fetch from 'isomorphic-fetch';


function reqAjkHousePrice() {
    return {type: ActionTypes.ANJUKE_CITY_PRICE_REQUEST}
}

function reqAjkHousePriceSuccess(res) {
    return {type: ActionTypes.ANJUKE_CITY_PRICE_SUCCESS, data: res}
}

function reqAjkHousePriceFail() {
    return {type: ActionTypes.ANJUKE_CITY_PRICE_SUCCESS, data: res}
}

function getAjkHousePrice(cityId, subSubAreaName) {
    return (dispatch) => {
        dispatch(reqAjkHousePrice());
        fetch(url + '/api/getAjkAreaHouseInfo/' + cityId + '/' + subSubAreaName).then((res) => {
            return res.json();
        }).then((res) => {
            console.log(res);
            if(res.code === 200){
                dispatch(reqAjkHousePriceSuccess(res));
            }else{
                dispatch(reqAjkHousePriceFail(res));
            }
        }, (res) => {
            dispatch(reqAjkHousePriceFail(res));
        });
    }
}

exports.getAjkHousePrice = getAjkHousePrice;
