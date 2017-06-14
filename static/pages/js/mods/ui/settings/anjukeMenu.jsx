import React from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import {connect} from 'react-redux';
const FormItem = Form.Item;

import {sendMenuData, changeUrlAction} from '../../action/settingsAction';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

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
        const {getFieldDecorator,getFieldsError} = this.props.form;
        return (
            <Form>
                <FormItem>
                    {getFieldDecorator('webUrl',{
                        rules:[{
                            required:true,message:'input your website url!'
                        },{
                            type:'url',message:'input web url!'
                        }]
                    })(
                        <Input style={{
                            width: 300
                        }} addonBefore="WEB地址" placeholder="请输入地址" onChange={(e) => {
                            changeUrl(e.target.value);
                        }}/>
                    )}

                </FormItem>
                <FormItem>
                    <Button htmlType="submit" disabled={reqState === '0' || hasErrors(getFieldsError()) || !url}  onClick={(e) => {
                        this.handlerSubmit(e);
                    }} type="primary" size="large">submit</Button>
                </FormItem>
            </Form>
        )
    }
    handlerSubmit(e) {
        e.preventDefault();
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
//通过这种方式 又扩展了一下 方法
//Form.create()(AnjukeMenuSettings)
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AnjukeMenuSettings));
