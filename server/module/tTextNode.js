'use strict';
class TTextNode{
    /**
     * [constructor description]
     * @param  {[type]} text   [description]
     * @param  {[type]} parent [description]
     * @return {[type]}        [description]
     */
    constructor(text,parent){
        this.text = text;
        this.parent = parent;
        this.type = 3;
    }
}
module.exports = TTextNode;
