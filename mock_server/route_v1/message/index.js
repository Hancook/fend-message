/**
 * Created by hao.wang on 2017/6/28.
 * 角色选择-公用
 */
const app = require('../../server')
const Mock = require('mockjs')
const routes = []
module.exports = routes


routes.push({
  desc: '班级通知',
  path: 'message/records',
  method: 'get',
  jsonHandler: function (req, res) { //返回json数据

    const json = Mock.mock({
      "status": 0,
      "message": "请求成功",
      "data": {
        "content|13": [{
          "id": "402880f75e60c29a015e6ec96e310014",
          "createTime": 1505097248304,
          "updateTime": 1505097248304,
          "message": {
            "id": "402880f75e60c29a015e6ec96e2c0013",
            "createTime": 1505097248300,
            "updateTime": 1505097248300,
            "title": "【测试】111111",
            "content": "测试",
            "senderId": "string",
            "senderName": "string",
            "frontCover": null,
            "hasRead": null,
            "finish": false,
            "messageType": "BROADCAST"
          },
          "messageId": "402880f75e60c29a015e6ec96e2c0013",
          "userId": "0333aba5a87f4531870caa2a38046797",
          "hasRead": true
        }],
        "last": false,
        "totalElements": 20,
        "totalPages": 2,
        "number": 0,
        "size": 12,
        "sort": [{
          "direction": "DESC",
          "property": "createTime",
          "ignoreCase": false,
          "nullHandling": "NATIVE",
          "ascending": false,
          "descending": true
        }],
        "first": true,
        "numberOfElements": 12
      },
      "success": true
    })
    return {
      status: 200,
      json
    }
  }
})




routes.push({
  desc: '系统通知',
  path: 'message/records',
  method: 'get',
  jsonHandler: function (req, res) { //返回json数据

    const json = Mock.mock({
      "status": 0,
      "message": "请求成功",
      "data": {
        "content|13": [{
          "id": "402880f75e60c29a015e6ec96e310014",
          "createTime": 1505097248304,
          "updateTime": 1505097248304,
          "message": {
            "id": "402880f75e60c29a015e6ec96e2c0013",
            "createTime": 1505097248300,
            "updateTime": 1505097248300,
            "title": "【测试】111111",
            "content": "测试",
            "senderId": "string",
            "senderName": "string",
            "frontCover": null,
            "hasRead": null,
            "finish": false,
            "messageType": "BROADCAST"
          },
          "messageId": "402880f75e60c29a015e6ec96e2c0013",
          "userId": "0333aba5a87f4531870caa2a38046797",
          "hasRead": true
        }],
        "last": false,
        "totalElements": 20,
        "totalPages": 2,
        "number": 0,
        "size": 12,
        "sort": [{
          "direction": "DESC",
          "property": "createTime",
          "ignoreCase": false,
          "nullHandling": "NATIVE",
          "ascending": false,
          "descending": true
        }],
        "first": true,
        "numberOfElements": 12
      },
      "success": true
    })
    return {
      status: 200,
      json
    }
  }
})


