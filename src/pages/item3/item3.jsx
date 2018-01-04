import React, { Component } from 'react';
import { Table, Button, Breadcrumb,Input, Row, Col,Modal } from 'antd';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Layout from 'components/layout2/layout2';
import 'pages/item3/item3.less';
import Tablestore3 from 'store/tablestore3';
import modal from 'components/modal/modal';
import UserConfig from './userConfig';
import ModalComponent from 'components/modal/showmodal';
const Search = Input.Search;

const store3 = new Tablestore3();
const url = 'claa/tablelist';
@observer
class PageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: []
    };
    this.handleTableChange = this.handleTableChange.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.addUser = this.addUser.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.columns = [{
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: text => <a href="#" >{text}</a >
    }, {
      title: '角色',
      dataIndex: 'rolename',
      key: 'rolename'
    }, {
      title: '生效时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: true
    }, {
      title: '失效时间',
      dataIndex: 'deadTime',
      key: 'deadTime',
      sorter: true
    }, {
      title: '状态',
      dataIndex: 'userState',
      key: 'userState',
      sorter: true
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => (
        <span >
      <a onClick={()=>{this.showEdit(text, record, index)} }>编辑</a >
      <span className="ant-divider" />
      <a onClick={()=>{this.deletUser(text, record, index)}}>删除</a >
         </span >
      )
    }];
  }
  componentDidMount() {
    this.fetch();
  }
  fetch = (params = {}) => {
    const queryParam = {
      url,
      method: 'get',
      data: {
        pageSize: store3.dataObj.pagination.pageSize,
        current: store3.dataObj.pagination.current,
        ...params
      }
    };
    store3.fetchData(queryParam);
  }
  @observable userModalProps = {
    item: {},
    modalType: '',
    visible: false
  }
  onOk(data) {
    const param = {
      paramData: data,
      fetchFn: this.fetch
    }
    if(this.userModalProps.modalType === 'create') {
      store3.fetchAddUser(param);
    }else{
      store3.fetchEditUser(param);
    }
    this.userModalProps.visible = false;
  }
  onCancel() {
    this.userModalProps.visible = false;
  }
  handleTableChange = (pagination, filters, sorter) => {
    store3.dataObj.pagination.current = pagination.current;
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order
    });
  };
  addUser = () => {
    //this.userModalProps.modalType = 'create';
    //this.userModalProps.visible = true;
    //this.userModalProps.item = {};
    //$('.role-btn').removeClass('btnactive');
    const that = this;
    modal.showModel({
      type: 'dialog',
      title: '新增用户',
      Dialog: UserConfig,
      ok: (value) => {
        const params = {
          loadingFlag: false,
          url,
          method: 'POST',
          data: {
            type: 0,
            username: value.username,
            rolename: value.rolename,
            userDesc: value.userDesc
          },
          successFn() {
            that.fetch();
          }
        };
        store3.createUser(params);
      },
      param: {}
    });
  }
  showEdit = (text, record, index) => {

    //this.userModalProps.modalType = '';
    //this.userModalProps.visible = true;
    //this.userModalProps.item = record;


    const that = this;
    modal.showModel({
      type: 'dialog',
      title: '编辑用户',
      Dialog: UserConfig,
      ok: (value) => {
        const params = {
          loadingFlag: false,
          url,
          method: 'POST',
          data: {
            type: 0,
            username: value.username,
            rolename: value.rolename,
            userDesc: value.userDesc
          },
          successFn() {
            that.fetch();
          }
        };
        store3.createUser(params);
      },
      param: record
    });


  }
  deletUser = (text, record, index) => {
    const that = this;
    const param = {
      paramData: record.key,
      fetchFn: that.fetch
    }
    store3.fetchDeletUser(param);
  }
  deletMany = () => {
    const that = this;
    if (this.state.selectedRowKeys.length === 0){
      Modal.warning({
        title: '请选择删除项'
      });
    } else {
      const tempArry = [];
      this.state.selectedRowKeys.map((item) => {
        tempArry.push(item);
      })
      const param = {
        paramData: tempArry,
        fetchFn: that.fetch
      }
      store3.fetchDeletUser(param);
    }
  }
  searchFn = (value) => {
    this.fetch({
      searchValue: value
    });
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys: selectedRowKeys});
  }

  render() {
    const that = this;
    const rowSelection = {
      onChange: that.onSelectChange
    };
    const datasorce = store3.dataObj.list.slice();
    return (
      <Layout name="item3">
        <div>
          <div className="nav-right">
            <Row className="row-item3">
              <Col span={8}><a className="currentName" href={browserHistory.getCurrentLocation().pathname}>{browserHistory.getCurrentLocation().pathname}</a></Col>
              <Col span={6} offset={10} className="col-btns">
                <Search
                  placeholder="input search text"
                  style={{ width: 200 }}
                  onSearch={value => this.searchFn(value)}
                />
                <span className="ant-divider" />
                <Button className="btn-add" size="large" type="ghost" onClick={this.deletMany}>批量删除</Button>
                <span className="ant-divider" />
                <Button className="btn-add" size="large" type="ghost" onClick={this.addUser}>添加</Button>
              </Col>
            </Row>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={this.columns}
            bordered
            dataSource={datasorce}
            pagination={store3.dataObj.pagination}
            loading={store3.dataObj.loadingFlag}
            onChange={this.handleTableChange}
          />
          <ModalComponent opts = {this.userModalProps.visible } optslist={this.userModalProps} handeleOk = {(data) => this.onOk(data)} handleCancel = {() => this.onCancel()} />
        </div>
      </Layout>
    );
  }
}


export default PageComponent;
