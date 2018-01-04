import React, { Component } from 'react';
import { Form, Input,Radio,Button } from 'antd';
import { observable } from 'mobx';
import modal from 'components/modal/modal';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};
class modalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.selectrole = this.selectrole.bind(this);
  }
  @observable thisVisable=null;
  cancelClickHandler() {
    modal.closeModel();
  }
  handleOk(e) {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const data = {
        ...values
       // key: item.key
      };
      //this.props.handeleOk(data);
      this.props.onTrigger(data);
    });
  }
  handleCancel() {
    this.props.handleCancel();
  }
  selectrole(e) {
    // $('.role-btn').removeClass('btnactive');
    this.props.form.setFieldsValue({
      rolename: e.target.innerText
    });
    // $(e.target).addClass('btnactive');
    this.props.optslist.item.rolename = e.target.innerText;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem label="用户名：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '用户名未填写'
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem label="角色：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('rolename', {
            rules: [
              {
                required: true,
                message: '角色未填写'
              }
            ]
          })(
            <Radio.Group >
              <Radio.Button value="普通用户" >普通用户</Radio.Button >
              <Radio.Button value="管理员" >管理员</Radio.Button >
            </Radio.Group >
            )}
        </FormItem>
        <FormItem label="用户信息描述：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('userDesc', {
            rules: [
              {
                required: true,
                message: '用户名未填写'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 24 }}
          className="footer"
        >
          <Button type="primary" htmlType="submit" onClick={this.handleOk}>
            确定
          </Button >
          <Button style={{ marginLeft: 8 }} onClick={this.cancelClickHandler} >
            取消
          </Button >
        </FormItem >
      </Form>
    );
  }
}
export default Form.create({
  mapPropsToFields(props) {
    const { param } = props;
    const rolename = param.rolename ? param.rolename : '';
    const username = param.username ? param.username : '';
    const desc = param.desc ? param.desc : '';
    return {
      rolename: { value: rolename },
      username: { value: username },
      userDesc: { value: desc }
    };
  }
})(modalComponent);
