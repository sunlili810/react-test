import React, { Component } from 'react';
import { Form, Input, Modal } from 'antd';
import { observable } from 'mobx';
import './modal.less';

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
  handleOk(e) {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      const data = {
        ...values
       // key: item.key
      };
      this.props.handeleOk(data);
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
      <Modal
        title={this.props.optslist.modalType === 'create' ? '新增用户' : '编辑用户'}
        visible={this.props.opts}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        wrapClassName="vertical-center-modal"
      >

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
            })(<div><button size="large" className={this.props.optslist.item.rolename === '普通用户' ? 'role-btn btnactive' : 'role-btn'} onClick={this.selectrole}>普通用户</button><button size="large" className={this.props.optslist.item.rolename === '管理员' ? 'role-btn btnactive' : 'role-btn'} onClick={this.selectrole}>管理员</button></div>)}
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
        </Form>
      </Modal>
    );
  }
}
export default Form.create({
  mapPropsToFields(props) {
    const { item } = props.optslist;
    const rolename = item.rolename ? item.rolename : '';
    const username = item.username ? item.username : '';
    const desc = item.deadTime ? item.deadTime : '';
    return {
      username: { value: username },
      rolename: { value: rolename },
      userDesc: { value: desc }
    };
  }
})(modalComponent);
