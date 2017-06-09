'use strict';
import './scss/loading.scss';
import React from 'react';

class Loading extends React.Component {
    render() {
        //pos 相关信息初始化
        let {marginTop} = this.props;

        return (
            <div className={'spinner'}>
                <div className={'double-bounce1'}></div>
                <div className={'double-bounce2'}></div>
            </div>
        );
    }
}


export default Loading;
