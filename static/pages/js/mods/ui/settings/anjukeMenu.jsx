import React from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import {connect} from 'react-redux';
const FormItem = Form.Item;

import {sendMenuData, changeUrlAction} from '../../action/settingsAction';

class AnjukeMenuSettings extends React.Component {
    componentDidUpdate(){
        let {reqState} = this.props;
        if(reqState === '1'){
            message.success('req success');
        }else if(reqState === '2'){
            message.error('req error');
        }
    }
    render() {
        let {url, reqState, changeUrl, save} = this.props;
        return (
            <Form>
                <FormItem>
                    <Input style={{
                        width: 300
                    }} addonBefore="WEB地址" placeholder="请输入地址" onChange={(e) => {
                        changeUrl(e.target.value);
                    }}/>
                </FormItem>
                <FormItem>
                    <Button disabled={reqState === '0'}  onClick={(e) => {
                        this.handlerSubmit(e);
                    }} type="primary" size="large">submit</Button>
                </FormItem>
            </Form>
        )
    }
    handlerSubmit(e) {
        let {save, url} = this.props;
        save(url);
    }
}
function mapStateToProps(state) {
    return {url: state.get('settings').get('url'), reqState: state.get('settings').get('anjukeMenuReqState')}
}
function mapDispatchToProps(dispatch) {
    return {
        save: function(url) {
            dispatch(sendMenuData(url));
        },
        changeUrl: function(url) {
            dispatch(changeUrlAction(url));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnjukeMenuSettings);
