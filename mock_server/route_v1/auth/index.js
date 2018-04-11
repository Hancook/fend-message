/**
 * Created by hao.wang on 2017/6/28.
 * 授权相关
 */
const app = require('../../server')
const Mock = require('mockjs')
const routes = []
module.exports = routes

const auth = function () {
  return {
    "data": {
      "name": "string",
      "personId": "string",
      "phone": "string",
      "schoolId": "string",
      "token": {
        "expireAt": new Date().getTime() + 1000 * 60 * 30,
        "token": "string"
      }
    },
    "message": "string",
    "status": 0,
    "success": true
  }
}
routes.push({
  desc: '[001] 通过微信code获取用户身份信息',
  path: 'wx/auth_dev',
  method: 'post',
  jsonHandler: function (req, res) { //返回json数据

    const json = Mock.mock(auth())
    return {
      status: 200,
      json
    }
  }
})

routes.push({
  desc: '[001] 通过微信code获取用户身份信息',
  path: 'wx/auth',
  method: 'post',
  jsonHandler: function (req, res) { //返回json数据

    const json = Mock.mock(auth())
    return {
      status: 200,
      json
    }
  }
})


routes.push({
  desc: '[0302] 选择身份',
  path: 'wx/jssdk',
  method: 'post',
  jsonHandler: function (req, res) { //返回json数据

    const json = Mock.mock({
      "status": 0,
      "message": "请求成功",
      "data": {
        "appId": "wxf49dc237afa152f7",
        "nonceStr": "724ca441-24ec-4e96-8774-7ac380ff350c",
        "signature": "3ea2240d32a92216d650a6195ebda338ddd78858",
        "timestamp": "1504260719",
        "url": "http://spmessage.dev3.pre.starclink.com/"
      },
      "success": true
    })
    return {
      status: 200,
      json
    }
  }
})
