import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
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
    };
  
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem
          label='测试'
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('testName', {
            rules: [
              {
                required: true,
                message: ''
              }
            ]
          })(<Input />)}
        </FormItem>

      
        <FormItem
          wrapperCol={{ span: 24 }}
          className="footer"
          style={{ textAlign: 'center' }}
        >
          <Button type="primary" htmlType="submit">
            确定
          </Button >
          <Button style={{ marginLeft: 8 }} >
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
    const testName = param.testName ? param.testName : '';
   
    return {
      versionName: Form.createFormField({ value: testName }),
    
    };
  }
})(modalComponent);
