'use strict';
class TNode {
    /**
     * 构造方法
     * @param  {[type]} tagName  tag名字
     * @param  {[type]} parent   父节点
     * @param  {[type]} children 子节点
     * @return {[type]}          [description]
     */
    constructor(tagName, parent, children) {
        this.tagName = tagName;
        this.parent = parent || null;
        this.children = children || [];
        this.type = 1;
    }
}

module.exports = TNode;
