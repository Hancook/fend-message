```
# 测试地址
```
http://10.144.238.68:8920//
```

# 1 获取课程列表
> url:

	/api/site

> method:

	post

> request:

```json

{
    "termCode":"username",  // 学期id 为空时取所有
    "userId":"2017090001"	// 用户id
}
```

> response:

```json
{
  "status": 0,
  "message": "请求成功",
  "data": {
    "siteList": [
      {
        "siteId": "c316a90fb7bd11e7a32c005056b233c9",
        "siteName": "C语言程序设计",
        "teacherCode": "2015980003",
        "classIconUrl": "style/images/siteDefaultImg.png",
        "teacherName": "王逊",
        "termName": "2017年秋",
        "classDesc": null
      },
      {
        "siteId": "76a5023cb7c011e7a32c005056b233c9",
        "siteName": "C语言程序设计 - A班,B班",
        "teacherCode": "2015980003",
        "classIconUrl": "style/images/siteDefaultImg.png",
        "teacherName": "王逊",
        "termName": "2017年秋",
        "classDesc": null
      },
      {
        "siteId": "4e48cb6696cc11e7a9bc005056b233c9",
        "siteName": "测试课程26",
        "teacherCode": "2017868688",
        "classIconUrl": "style/images/siteDefaultImg.png",
        "teacherName": "魏涛",
        "termName": "2017年秋",
        "classDesc": null
      },
      {
        "siteId": "fb7144c9b9fc11e7a32c005056b233c9",
        "siteName": "素描3 - 1",
        "teacherCode": "2006982386",
        "classIconUrl": "style/images/siteDefaultImg.png",
        "teacherName": "杨杨",
        "termName": "2017年秋",
        "classDesc": null
      },
      {
        "siteId": "f9ab83b1b39c11e7a32c005056b233c9",
        "siteName": "素描5",
        "teacherCode": "2013980054",
        "classIconUrl": "style/images/siteDefaultImg.png",
        "teacherName": "姚元鲁",
        "termName": "2017年秋",
        "classDesc": null
      },
      {
        "siteId": "a6c968a596cc11e7a9bc005056b233c9",
        "siteName": "测试课程28",
        "teacherCode": "2017878878",
        "classIconUrl": "style/images/siteDefaultImg.png",
        "teacherName": "小王老师",
        "termName": "2017年秋",
        "classDesc": null
      },
      {
        "siteId": "2545968eb54611e7a32c005056b233c9",
        "siteName": "C语言程序设计",
        "teacherCode": "2015980003",
        "classIconUrl": "style/images/siteDefaultImg.png",
        "teacherName": "王逊",
        "termName": "2017年秋",
        "classDesc": null
      }
    ],
    "termList": [
      {
        "id": 17,
        "schoolYearId": 6,
        "termCode": "201901",
        "termName": "2019年春",
        "isCurrent": "0",
        "isVisual": "1",
        "startTime": 1506441600000,
        "endTime": 1396195200000
      },
      {
        "id": 24,
        "schoolYearId": 8,
        "termCode": "202103",
        "termName": "2021年夏",
        "isCurrent": "0",
        "isVisual": "1",
        "startTime": 1505145600000,
        "endTime": 1630339200000
      },
      {
        "id": 13,
        "schoolYearId": 5,
        "termCode": "201702",
        "termName": "2017年秋",
        "isCurrent": "1",
        "isVisual": "1",
        "startTime": 1504195200000,
        "endTime": 1517328000000
      },
      {
        "id": 23,
        "schoolYearId": 8,
        "termCode": "202101",
        "termName": "2021年春",
        "isCurrent": "0",
        "isVisual": "1",
        "startTime": 1504108800000,
        "endTime": 1509379200000
      },
      {
        "id": 12,
        "schoolYearId": 4,
        "termCode": "201703",
        "termName": "2017年夏",
        "isCurrent": "0",
        "isVisual": "1",
        "startTime": 1498838400000,
        "endTime": 1504108800000
      },
      {
        "id": 11,
        "schoolYearId": 4,
        "termCode": "201701",
        "termName": "2017年春",
        "isCurrent": "0",
        "isVisual": "1",
        "startTime": 1485878400000,
        "endTime": 1498752000000
      },
      {
        "id": 10,
        "schoolYearId": 4,
        "termCode": "201602",
        "termName": "2016年秋",
        "isCurrent": "0",
        "isVisual": "1",
        "startTime": 1472659200000,
        "endTime": 1509379200000
      },
      {
        "id": 9,
        "schoolYearId": 3,
        "termCode": "201603",
        "termName": "2016年夏",
        "isCurrent": "0",
        "isVisual": "1",
        "startTime": 1467302400000,
        "endTime": 1472572800000
      },
      {
        "id": 1,
        "schoolYearId": 1,
        "termCode": "201302",
        "termName": "2013年秋",
        "isCurrent": "0",
        "isVisual": "1",
        "startTime": 1377964800000,
        "endTime": 1391097600000
      }
    ]
  },
  "success": true
}



```

# 2 获取课程节点

> url:

	/api/site/{siteId}/nodes

> method:

	GET

> request:

	siteId				#路径参数 课程Id
	parentNodeId		#请求参数 父节点id
	level				#节点层数
> response:

```json
{
    "code": 1,
    "msg": "微信端获取站点资源成功！",
    "data": {
        "nodeList": [
            {
                "id": "30d7b4a7b88711e7a32c005056b233c9",
                "siteId": "4e48cb6696cc11e7a9bc005056b233c9",
                "resourceName": "第二章:摔跤吧，老爹",
                "resourceType": "1",
                "hasFatherNode": "0",
                "hasChildNode": "1",
                "resourceVisible": "1",
                "isdelete": "0",
                "recommendLearnTime": 0,
                "resourceOrder": 0,
                "fatherNodeId": null,
                "level": 0,
                "resourceAttachmentList": [],
                "teachingPlanId": null
            },
            {
                "id": "47a50caeb88711e7a32c005056b233c9",
                "siteId": "4e48cb6696cc11e7a9bc005056b233c9",
                "resourceName": "第一章相信老爸",
                "resourceType": "1",
                "hasFatherNode": "0",
                "hasChildNode": "0",
                "resourceVisible": "1",
                "isdelete": "0",
                "recommendLearnTime": 0,
                "resourceOrder": 0,
                "fatherNodeId": null,
                "level": 0,
                "resourceAttachmentList": [],
                "teachingPlanId": null
            },
            {
                "id": "f5ef44c2982411e7a9bc005056b233c9",
                "siteId": "4e48cb6696cc11e7a9bc005056b233c9",
                "resourceName": "教学导航",
                "resourceType": "1",
                "hasFatherNode": "0",
                "hasChildNode": "1",
                "resourceVisible": "1",
                "isdelete": "0",
                "recommendLearnTime": 0,
                "resourceOrder": 0,
                "fatherNodeId": null,
                "level": 0,
                "resourceAttachmentList": [],
                "teachingPlanId": null
            },
            {
                "id": "5798c354af2311e7a32c005056b233c9",
                "siteId": "4e48cb6696cc11e7a9bc005056b233c9",
                "resourceName": "123",
                "resourceType": "1",
                "hasFatherNode": "0",
                "hasChildNode": "0",
                "resourceVisible": "1",
                "isdelete": "0",
                "recommendLearnTime": 0,
                "resourceOrder": 1,
                "fatherNodeId": null,
                "level": 0,
                "resourceAttachmentList": [],
                "teachingPlanId": null
            },
            {
                "id": "06a60408b55e11e7a32c005056b233c9",
                "siteId": "4e48cb6696cc11e7a9bc005056b233c9",
                "resourceName": "一、绪论",
                "resourceType": "1",
                "hasFatherNode": "0",
                "hasChildNode": "0",
                "resourceVisible": "1",
                "isdelete": "0",
                "recommendLearnTime": 0,
                "resourceOrder": 2,
                "fatherNodeId": null,
                "level": 0,
                "resourceAttachmentList": [],
                "teachingPlanId": null
            },
            {
                "id": "94afb670b7cd11e7a32c005056b233c9",
                "siteId": "4e48cb6696cc11e7a9bc005056b233c9",
                "resourceName": "专题资源",
                "resourceType": "1",
                "hasFatherNode": "0",
                "hasChildNode": "0",
                "resourceVisible": "1",
                "isdelete": "0",
                "recommendLearnTime": 0,
                "resourceOrder": 17,
                "fatherNodeId": null,
                "level": 0,
                "resourceAttachmentList": [],
                "teachingPlanId": null
            },
            {
                "id": "aa5e1621b7cd11e7a32c005056b233c9",
                "siteId": "4e48cb6696cc11e7a9bc005056b233c9",
                "resourceName": "专题资源",
                "resourceType": "1",
                "hasFatherNode": "0",
                "hasChildNode": "0",
                "resourceVisible": "1",
                "isdelete": "0",
                "recommendLearnTime": 0,
                "resourceOrder": 18,
                "fatherNodeId": null,
                "level": 0,
                "resourceAttachmentList": [],
                "teachingPlanId": null
            }
        ]
    }
}
```

# 3 获取用户学习token
> url:

	/api/resource/token

> method:

	GET

> response:

```json
{
    "code":1,
    "msg":"请求成功",
    "data":"60a1fbef-ee3b-495b-b071-2be295db4347"
}
```


# 4 用户学习资源跳转url
> url:

	{RootUrl} filePreview/{attachmentId}?siteResourceId={siteResourceId}&token={ token}

> method:

	url跳转

> request:

路径参数：
RootUrl:测试版 http://starmooc.nercel.cn/starmooc/ 正式版 http://spoc.ccnu.edu.cn/
attachmentId:资源云存储id
siteResourceId:课堂资源ID
token:用户登录token

# 5 获取主题列表
> url:

	/api/forum/topic

> method:

	GET

> request:

	page 				# 页数
	siteId      # 站点id

> response:

```json
{
    "code": 1,
    "msg": null,
    "data": {
        "pageNum": 1,
        "pageSize": 15,
        "size": 15,
        "startRow": 1,
        "endRow": 15,
        "total": 18,
        "pages": 2,
        "list": [
            {
                "tid": "38a053e9c2a011e7a32c005056b233c9",
                "sectionId": "4e57eb4a96cc11e7a9bc005056b233c9",
                "title": "后天有检查,请穿戴整齐",
                "userId": "85e366618cab11e7a9bc005056b233c9",
                "userName": "小李老师",
                "status": "0",
                "viewNum": 0,
                "replyNum": 0,
                "createTime": 1509937864000,
                "content": null,
                "aids": null,
                "userType": "3",
                "academy": null,
                "siteName": null,
                "isOwner": "2",
                "isReplay": "2",
                "isTeacherThread": "2"
            },
            {
                "tid": "c8287577afe611e7a32c005056b233c9",
                "sectionId": "4e57eb4a96cc11e7a9bc005056b233c9",
                "title": "666",
                "userId": "85e366618cab11e7a9bc005056b233c9",
                "userName": "小李老师",
                "status": "0",
                "viewNum": 6,
                "replyNum": 7,
                "createTime": 1507879107000,
                "content": null,
                "aids": null,
                "userType": "3",
                "academy": null,
                "siteName": null,
                "isOwner": "2",
                "isReplay": "2",
                "isTeacherThread": "2"
            },
            {
                "tid": "69bd9b35afe611e7a32c005056b233c9",
                "sectionId": "4e57eb4a96cc11e7a9bc005056b233c9",
                "title": "秋天，荻苇扬花，芦苇飘絮。荻苇和",
                "userId": "85e366618cab11e7a9bc005056b233c9",
                "userName": "小李老师",
                "status": "0",
                "viewNum": 1,
                "replyNum": 0,
                "createTime": 1507878949000,
                "content": null,
                "aids": null,
                "userType": "3",
                "academy": null,
                "siteName": null,
                "isOwner": "2",
                "isReplay": "2",
                "isTeacherThread": "2"
            },
            {
                "tid": "ff8e2413afe511e7a32c005056b233c9",
                "sectionId": "4e57eb4a96cc11e7a9bc005056b233c9",
                "title": "良辰美景",
                "userId": "85e366618cab11e7a9bc005056b233c9",
                "userName": "小李老师",
                "status": "0",
                "viewNum": 0,
                "replyNum": 0,
                "createTime": 1507878771000,
                "content": null,
                "aids": null,
                "userType": "3",
                "academy": null,
                "siteName": null,
                "isOwner": "2",
                "isReplay": "2",
                "isTeacherThread": "2"
            },
            {
                "tid": "f7bffedfafe511e7a32c005056b233c9",
                "sectionId": "4e57eb4a96cc11e7a9bc005056b233c9",
                "title": "良辰美景",
                "userId": "85e366618cab11e7a9bc005056b233c9",
                "userName": "小李老师",
                "status": "0",
                "viewNum": 4,
                "replyNum": 2,
                "createTime": 1507878758000,
                "content": null,
                "aids": null,
                "userType": "3",
                "academy": null,
                "siteName": null,
                "isOwner": "2",
                "isReplay": "2",
                "isTeacherThread": "2"
            }
        ],
        "firstPage": 1,
        "prePage": 0,
        "nextPage": 2,
        "lastPage": 2,
        "isFirstPage": true,
        "isLastPage": false,
        "hasPreviousPage": false,
        "hasNextPage": true,
        "navigatePages": 8,
        "navigatepageNums": [
            1,
            2
        ]
    }
}
```

# 6 发送某主题回复
> url:

	/api/forum/reply

> method:

	POST

> request:

	{
    "content": "string",  #回复内容
    "sectionId": "string",
    "tid": "string",  #topicId
    "title": "string" #回复标题
  }

> response:

```json
{
    "code":1,
    "msg":"请求成功",
}
```

# 7 获取某主题回复列表
> url:

	/api/forum/topic/{topicId}/reply

> method:

	GET

> request:

  topicId : #路径参数
  page： 普通参数 页数

> response:

```json
{
    "code": 1,
    "msg": null,
    "data": {
        "pageNum": 1,
        "pageSize": 5,
        "size": 5,
        "startRow": 1,
        "endRow": 5,
        "total": 8,
        "pages": 2,
        "list": [
            {
                "pid": "b52a177ac03811e782af005056b233c9",
                "sectionId": "280ac1b68b2611e7b5ae002324e2335a",
                "tid": "b5262499c03811e782af005056b233c9",
                "first": "1",
                "parentId": null,
                "title": "学校评选三好学生",
                "userId": "16912",
                "userName": "姚华雄",
                "postLayer": 1,
                "status": "0",
                "createTime": 1509673758000,
                "content": "学校评选三好学生,大家快踊跃报名",
                "aids": null,
                "attachments": null,
                "headImageUrl": "http://files.spoc.ccnu.edu.cn/starmooc/7d042cf37a244b1aa9a10d404c11eb11",
                "roleCode": null
            },
            {
                "pid": "fe016b32c03811e782af005056b233c9",
                "sectionId": "280ac1b68b2611e7b5ae002324e2335a",
                "tid": "b5262499c03811e782af005056b233c9",
                "first": "0",
                "parentId": null,
                "title": "回复#1",
                "userId": "32560",
                "userName": "段雅颂",
                "postLayer": 2,
                "status": "0",
                "createTime": 1509673880000,
                "content": "我第一个报名哈，嘻嘻",
                "aids": null,
                "attachments": null,
                "headImageUrl": "http://files.spoc.ccnu.edu.cn/starmooc/77adb12f564e431ca21d967c06828679",
                "roleCode": null
            },
            {
                "pid": "24e647b5c05b11e782af005056b233c9",
                "sectionId": "280ac1b68b2611e7b5ae002324e2335a",
                "tid": "b5262499c03811e782af005056b233c9",
                "first": "0",
                "parentId": null,
                "title": "我再来报个名",
                "userId": "32560",
                "userName": "段雅颂",
                "postLayer": 3,
                "status": "0",
                "createTime": 1509688548000,
                "content": "我再来报个名",
                "aids": null,
                "attachments": null,
                "headImageUrl": "http://files.spoc.ccnu.edu.cn/starmooc/77adb12f564e431ca21d967c06828679",
                "roleCode": null
            },
            {
                "pid": "359b3409c05b11e782af005056b233c9",
                "sectionId": "280ac1b68b2611e7b5ae002324e2335a",
                "tid": "b5262499c03811e782af005056b233c9",
                "first": "0",
                "parentId": null,
                "title": "我也来报名哈",
                "userId": "32597",
                "userName": "王泽红",
                "postLayer": 4,
                "status": "0",
                "createTime": 1509688576000,
                "content": "我也来报名哈",
                "aids": null,
                "attachments": null,
                "headImageUrl": "http://files.spoc.ccnu.edu.cn/starmooc/f353c83602e240f4b1da35aff284e333",
                "roleCode": null
            },
            {
                "pid": "44397a5ac05b11e782af005056b233c9",
                "sectionId": "280ac1b68b2611e7b5ae002324e2335a",
                "tid": "b5262499c03811e782af005056b233c9",
                "first": "0",
                "parentId": null,
                "title": "我也来报名",
                "userId": "32774",
                "userName": "卓利云",
                "postLayer": 5,
                "status": "0",
                "createTime": 1509688600000,
                "content": "我也来报名",
                "aids": null,
                "attachments": null,
                "headImageUrl": "http://files.spoc.ccnu.edu.cn/starmooc/fa4c02cb83e346c9a7e35a5466a4b290",
                "roleCode": null
            }
        ],
        "firstPage": 1,
        "prePage": 0,
        "nextPage": 2,
        "lastPage": 2,
        "isFirstPage": true,
        "isLastPage": false,
        "hasPreviousPage": false,
        "hasNextPage": true,
        "navigatePages": 8,
        "navigatepageNums": [
            1,
            2
        ]
    }
}

```

# 8 获取作业列表
> url:

	/api/homework/list

> method:

	GET

> request:

  page : #普通参数
  siteId： 列表id
  finish：true:获取未提交作业，false：已提交作业

> response:

```json
{
    "code": 1,
    "msg": null,
    "data": {
        "pageNum": 1,
        "pageSize": 5,
        "size": 3,
        "startRow": 1,
        "endRow": 3,
        "total": 3,
        "pages": 1,
        "list": [
            {
                "id": "fd1246a1b88111e782af005056b233c9",
                "siteId": "2809df968b2611e7b5ae002324e2335a",
                "siteName": null,
                "title": "分组作业",
                "content": "分组作业的内容",
                "creater": "16912",
                "creatername": "姚华雄",
                "begintime": 1508774400000,
                "endtime": 1509465599000,
                "isgroup": "1",
                "attmentNum": null,
                "groupNum": null,
                "pointNum": null,
                "studentNum": null,
                "commitNum": null,
                "unCommitNum": null,
                "groupPoint": null,
                "personalPoint": null,
                "createtime": 1508825610000,
                "status": "0",
                "roleCode": null
            },
            {
                "id": "286cfdc1950b11e78441000c2974f54a",
                "siteId": "1de8202f8b2611e7b5ae002324e2335a",
                "siteName": null,
                "title": "论述题（智慧课堂学生的作业）",
                "content": "中共中央政治局于2015年1月23日下午就辩证唯物主义基本原理和方法论进行第二十次集体学习。习近平在主持学习时强调，辩证唯物主义是中国共产党人的世界观和方法论，我们党要团结带领人民协调推进全面建成小康社会、全面深化改革、全面依法治国、全面从严治党，实现“两个一百年”奋斗目标、实现中华民族伟大复兴的中国梦，必须不断接受马克思主义哲学智慧的滋养，更加自觉地坚持和运用辩证唯物主义世界观和方法论，增强辩证思维、战略思维能力，努力提高解决我国改革发展基本问题的本领。请阐述辩证唯物主义对我国改革实践的指导意义。",
                "creater": "49",
                "creatername": "杨足仪",
                "begintime": 1505059200000,
                "endtime": 1506787199000,
                "isgroup": "0",
                "attmentNum": null,
                "groupNum": null,
                "pointNum": null,
                "studentNum": null,
                "commitNum": null,
                "unCommitNum": null,
                "groupPoint": null,
                "personalPoint": null,
                "createtime": 1504926081000,
                "status": "0",
                "roleCode": null
            },
            {
                "id": "33abaded8c6411e78441000c2974f54a",
                "siteId": "2809df968b2611e7b5ae002324e2335a",
                "siteName": null,
                "title": "布置新作业",
                "content": "布置新作业",
                "creater": "16912",
                "creatername": "姚华雄",
                "begintime": 1503936000000,
                "endtime": 1509465599000,
                "isgroup": "0",
                "attmentNum": null,
                "groupNum": null,
                "pointNum": null,
                "studentNum": null,
                "commitNum": null,
                "unCommitNum": null,
                "groupPoint": null,
                "personalPoint": null,
                "createtime": 1503974765000,
                "status": "0",
                "roleCode": null
            }
        ],
        "firstPage": 1,
        "prePage": 0,
        "nextPage": 0,
        "lastPage": 1,
        "isFirstPage": true,
        "isLastPage": true,
        "hasPreviousPage": false,
        "hasNextPage": false,
        "navigatePages": 8,
        "navigatepageNums": [
            1
        ]
    }
}返回参数说明:
code:1 成功 0 失败
msg:结果信息
id:作业id
siteId:课堂id
title:作业标题
content:作业内容
creater:发布作业人的userId
creatername:发布作业的人的名字
begintime:开始时间
endtime:结束时间
isgroup :是否是分组作业  0 否 1 是
status:状态  0  未提交  1 已提交  2 驳回  3 已评分
total:总数
pages:页数
size:每页实际查询的数量


传参返回错误信息:
{
    "code": 0,
    "msg": "传参缺少学生账号",
    "data": null
}

```

# 9 询学生被驳回原因的接口
> url:

	/api/homework/feedBack

> method:

	GET

> request:
  homeworkId : #普通参数 作业id

> response:
```json
 {
    "code": 1,
    "msg": null,
    "data": "这次做的不好,下次提交作业的时候需要改进"
}
```
