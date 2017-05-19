'use strict';
const TNode = require('../module/tNode.js');
const TTextNode = require('../module/tTextNode.js');
const _ = require('lodash');


function parseHtml(html) {
    const tagReg = /<(?:\/([^>]+)>)|<(?:([^\s\/>]*)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>\/])*)\/?>)/g;
    //根节点
    let root = new TNode('root');
    let res;
    //parentNodeList 栈结构方式，先进后出，每次拿出来的都是当前tag的父节点对象。
    let parentNodeList = [];
    parentNodeList.push(root);
    let prevRegIndex = 0;
    while (res = tagReg.exec(html)) {
        //下一次开始的坐标
        //tagReg.lastIndex

        //当前标签的
        //res.index
        if (res[1]) {
            //结尾eg: </span>
            //当前匹配到的下标，与开始匹配的下标
            let currentNode = _.last(parentNodeList);
            if (res.index > prevRegIndex) {
                let textNode = new TTextNode(html.substring(prevRegIndex,res.index), currentNode);
                currentNode.children.push(textNode);
            }
            //当前父节点出栈
            parentNodeList = _.dropRight(parentNodeList);
        } else {
            //开头eg: <span asdfaf.... >
            let currentNode = new TNode(res[2], _.last(parentNodeList));
            _.last(parentNodeList).children.push(currentNode);
            //当前节点作为父节点传入
            parentNodeList.push(currentNode);
            //当前匹配到的下标，与开始匹配的下标
            if (res.index > prevRegIndex) {
                let textNode = new TTextNode(html.substring(prevRegIndex,res.index), currentNode);
                currentNode.children.push(textNode);
            }
        }
        //下一次开始匹配的位置
        prevRegIndex = tagReg.lastIndex;
    }
    return root;
}

let testHtml = ' <tr>' +
    '<th style="width: 60px;text-align: center;" id="p_id">ID</th>' +
    '<th style="width: 140px;" id="p_ip">IP地址</th>' +
    '<th style="width: 60px;" id="p_port">端口</th>' +
    '<th style="width: 100px;text-align: center;" id="p_type">类型</th>' +
    '<th style="width: 65px;" id="p_anonymous">匿名度</th>' +
    '<th style="width: 130px;" id="p_country">国家(省市)</th>' +
    '<th style="width: 65px;" id="p_isp">运营商</th>' +
    '<th style="width:100px;text-align: center;" id="p_ping">响应时间</th>' +
    '<th style="width:100px;text-align: center;" id="p_transfer">传输速度</th>' +
    '<th style="width:150px;text-align: center;" id="p_checkdtime">验证日期</th>' +
    '</tr>';


console.log(require('util').inspect(parseHtml(testHtml), {
    depth: null
}));


module.exports = {
    getNodes: function(html) {
        // TODO
    }
};
