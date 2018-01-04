import { observable } from 'mobx';
import Ajax from 'util/ajax';

const url = 'claa/tablelist';

export default class Tablestore3 {
  @observable dataObj = {
    list: [],
    loadingFlag: false,
    pagination: {
      pageSize: 2,
      current: 1,
      total: 10,
      showSizeChanger: true,
      showQuickJumper: true
    }
  };

  fetchData(param) {
    this.dataObj.loadingFlag = true;
    const storeThis = this;
    const params = {
      successFn(data) {
        const tempObj = { ...storeThis.dataObj };
        tempObj.pagination.total = parseInt(data.total, 10);
        tempObj.loadingFlag = false;
        tempObj.list = data.list;
        tempObj.pagination;
        storeThis.dataObj = tempObj;
      },
      errorFn() {

      },
      ...param
    };
    Ajax.fetch(params);
  }
  createUser(param) {
    const params = {
      ...param
    };
    console.log(params);
    Ajax.fetch(params);
  }
  fetchEditUser(param) {
    const { paramData, fetchFn } = param;
    const queryParam = {
      url,
      method: 'post',
      data: {
        username: paramData.username,
        rolename: paramData.rolename,
        userDesc: paramData.userDesc
      },
      successFn(data) {
        fetchFn();
      },
      errorFn(data) {
      }
    };
    Ajax.fetch(queryParam);
  }
  fetchDeletUser(param) {
    const { paramData, fetchFn } = param;
    const queryParam = {
      url,
      method: 'post',
      data: {
        keys: paramData.username
      },
      successFn(data) {
        fetchFn();
      },
      errorFn(data) {
      }
    };
    Ajax.fetch(queryParam);
  }


}
