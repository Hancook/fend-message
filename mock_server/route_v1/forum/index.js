/**
 * Created by hao.wang on 2017/6/28.
 * 授权相关
 */
const app = require('../../server')
const Mock = require('mockjs')
const routes = []
module.exports = routes


routes.push({
  desc: '获取主题回复',
  path: 'forum/:id/replies',
  method: 'get',
  jsonHandler: function (req, res) { //返回json数据

    const json = Mock.mock({
      "status": 0,
      "message": "请求成功",
      "data": {
        "content|20": [{
          "id": "402880f75e4f89fd015e50fcd9bd0001",
          "createTime": 1504597301688,
          "updateTime": 1504597301688,
          "topicId": "111",
          "senderName": "mockPersonName",
          "senderUserId": "mockuserId",
          "content": "1111"
        }],
        "last": true,
        "totalPages": 1,
        "totalElements": 1,
        "number": 0,
        "size": 20,
        "sort": null,
        "first": true,
        "numberOfElements": 1
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
  desc: '发送主题回复',
  path: 'forum',
  method: 'post',
  jsonHandler: function (req, res) { //返回json数据

    const json = Mock.mock({
      "data": "string",
      "message": "string",
      "status": 0,
      "success": true
    })
    return {
      status: 200,
      json
    }
  }
})


