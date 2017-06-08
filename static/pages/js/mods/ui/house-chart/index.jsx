'use static';
//图表方面的内容

import React from 'react';

import {co} from 'co';
//JSON
import 'isomorphic-fetch';
//JSONP
import fetchJsonp from 'fetch-jsonp';

console.log(fetch);

console.log(fetchJsonp);

// fetchJsonp('http://feed.mix.sina.com.cn/api/roll/get?pageid=2&lid=48')
co(function* (){
    let res = yield fetchJsonp('http://feed.mix.sina.com.cn/api/roll/get?pageid=2&lid=48');
    //res.json() 返回的是 Promise对象
    return res.json();
}).then(function(json){
    console.log(json);
}).catch(function(e){

});

fetch('/api/test').then(function(response){
    return response.josn();
}).then(function(){},function(err){
    console.log(err);
})
