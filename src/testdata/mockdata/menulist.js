import Mock from 'mockjs';

export default Mock.mock('http://claa/menulist', {
  code: 0,
  list: [
    {
      key: 'item1',
      name: 'item1'
    }, {
      key: 'item2',
      name: 'item2'
    }, {
      key: 'item3',
      name: 'item3'
    }, {
      key: 'item4',
      name: 'item4'
    }
  ],
  message: 'error'
});
