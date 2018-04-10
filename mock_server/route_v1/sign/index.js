/**
 * Created by hao.wang on 2017/6/28.
 * 角色选择-公用
 */
const app = require('../../server')
const Mock = require('mockjs')
const routes = []
module.exports = routes


routes.push({
  desc: '签到确认',
  path: 'signin',
  method: 'post',
  delay: 0,
  jsonHandler: function (req, res) { //返回json数据
    const ok = {
      "status": 0,
      "message": "请求成功",
      "data": {
        "siteId": "74648d17b39c11e7a32c005056b233c9",
        "siteName": "构图",
        "teacherCode": "2006982386",
        "departmentCode": "5900",
        "courseCode": "43020001",
        "isLocalDomain": "1",
        "termCode": "201702",
        "otherdomainid": "1",
        "courseType": "主修课程",
        "classDesc": null,
        "classIconUrl": "style/images/siteDefaultImg.png",
        "ispublic": "1",
        "isdelete": "0",
        "certificateType": "无",
        "regularGradeWeight": null,
        "certificateStatus": null,
        "depName": null,
        "teacherName": "杨杨",
        "signInTime": 1508824975383,
        "startTime": 1508824895000,
        "endTime": 1508841059000
      },
      "success": true
    };

    // 重复签到返回
    const failed0 = {
      "status": -3,
      "message": "",
      "data": {
        "siteId": "74648d17b39c11e7a32c005056b233c9",
        "siteName": "构图",
        "teacherCode": "2006982386",
        "departmentCode": "5900",
        "courseCode": "43020001",
        "isLocalDomain": "1",
        "termCode": "201702",
        "otherdomainid": "1",
        "courseType": "主修课程",
        "classDesc": null,
        "classIconUrl": "style/images/siteDefaultImg.png",
        "ispublic": "1",
        "isdelete": "0",
        "certificateType": "无",
        "regularGradeWeight": null,
        "certificateStatus": null,
        "depName": null,
        "teacherName": "杨杨",
        "signInTime": 1508824975383,
        "startTime": 1508824895000,
        "endTime": 1508841059000
      },
      "success": false
    };

    // 该时间内没有对应的签到活动
    const failed_4 = {
      "status": -4,
      "message": "",
      "data": {},
      "success": false
    };

    const json = Mock.mock(failed0)
    return {
      status: 200,
      json
    }
  }
})


routes.push({
  desc: '获取课程及签到信息',
  path: 'signin/course/:id',
  method: 'get',
  jsonHandler: function (req, res) { //返回json数据

    const json = Mock.mock({
      "status": 0,
      "message": "请求成功",
      "data": {
        "id": "8a106ec45e32f108015e32f2ba6b0000",
        "createTime": 1504093321810,
        "updateTime": 1504093321810,
        "userId": "0333aba5a87f4531870caa2a38046797",
        "personName": "mockPersonName",
        "courseId": "x111",
        "courseName": "2017年度师生交流会",
        "courseLocation": "华师科学会堂401",
        "courseTime": 1504424124521,
        "latitude": null,
        "longitude": null,
        "accuracy": null,
        "speed": null,
        "finish": false
      },
      "success": true
    })
    return {
      status: 200,
      json
    }
  }
})

