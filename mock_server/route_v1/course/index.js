/**
 * Created by hao.wang on 2017/6/28.
 * 角色选择-公用
 */
const app = require('../../server')
const Mock = require('mockjs')
const routes = []
module.exports = routes


routes.push({
  desc: '[0611]获取课程列表',
  path: 'course',
  method: 'get',
  jsonHandler: function (req, res) { //返回json数据

    const json = Mock.mock({
        "status": 0,
        "message": "",
        "data": [
          {
            "id": "00b030d8979d11e78441000c2974f54a",
            "siteId": "2cae38008b2611e7b5ae002324e2335a",//课堂名称
            "resourceName": "学习活动",//教学内容名称
            "resourceType": "2",//值为2类型节点下无资源（课件、视频等）
            "hasFatherNode": "1",
            "hasChildNode": "1",
            "resourceVisible": "1",
            "isdelete": "0",
            "recommendLearnTime": 0,
            "resourceOrder": 1,
            "fatherNodeId": "00b00023979d11e78441000c2974f54a",
            "level": 4,
            "resourceAttachmentList": [],
            "teachingPlanId": null
          },
          {
            "id": "00b0f2ae979d11e78441000c2974f54a",
            "siteId": "2cae38008b2611e7b5ae002324e2335a",
            "resourceName": "扩展资源",
            "resourceType": "1",//值为1类型节点下无资源（课件、视频等）
            "hasFatherNode": "1",
            "hasChildNode": "0",
            "resourceVisible": "1",
            "isdelete": "0",
            "recommendLearnTime": 0,
            "resourceOrder": 3,
            "fatherNodeId": "00b00023979d11e78441000c2974f54a",
            "level": 4,
            "resourceAttachmentList": [//教学资源列表
              {
                "id": "00b11fd4979d11e78441000c2974f54a",
                "siteResourceId": "00b0f2ae979d11e78441000c2974f54a",
                "attachmentInfoId": "7d54c4027c3e11e79d9ef44d3015348b",
                "accessLimit": "11",
                "isdelete": "0",
                "attachment": {
                  "id": null,
                  "achmentId": null,
                  "attachmentName": "自尊的毕生发展_张永欣.pdf",
                  "description": null,
                  "userId": "8193",
                  "fileSize": 1152186,
                  "ext": "pdf",
                  "isMedia": "0",
                  "mimeType": "application/vnd.ms-xpsdocument",
                  "storageId": "object-9d9d6ebc8a_2016_04_22_09_51_16_GBAF_3231.pdf",
                  "previewStorageId": "object-8e30bbd120_2016_04_22_09_51_16_AAEC_8471.xps",
                  "sourceId": null,
                  "sourcePic": null,
                  "sourceStatus": null,
                  "sourceUrl": null,
                  "sourceDuration": null,
                  "uploadTime": 1461261077000,
                  "modifyTime": 1461261077000,
                  "browseCount": null,
                  "downloadCount": null,
                  "isDel": "0",
                  "bizType": "2",
                  "fileStatus": "2",
                  "transcodeCount": 0,
                  "studyTime": null
                }
              },
              {
                "id": "00b141bb979d11e78441000c2974f54a",
                "siteResourceId": "00b0f2ae979d11e78441000c2974f54a",
                "attachmentInfoId": "7d5662307c3e11e79d9ef44d3015348b",
                "accessLimit": "11",
                "isdelete": "0",
                "attachment": {
                  "id": null,
                  "achmentId": null,
                  "attachmentName": "自我意识情绪_聚焦于自我的道德情绪研究_俞国良.pdf",
                  "description": null,
                  "userId": "8193",
                  "fileSize": 173365,
                  "ext": "pdf",
                  "isMedia": "0",
                  "mimeType": "application/vnd.ms-xpsdocument",
                  "storageId": "object-525f240e25_2016_04_22_09_51_39_GEBH_6548.pdf",
                  "previewStorageId": "object-6d96df0abf_2016_04_22_09_51_39_JHAC_2034.xps",
                  "sourceId": null,
                  "sourcePic": null,
                  "sourceStatus": null,
                  "sourceUrl": null,
                  "sourceDuration": null,
                  "uploadTime": 1461261100000,
                  "modifyTime": 1461261100000,
                  "browseCount": null,
                  "downloadCount": null,
                  "isDel": "0",
                  "bizType": "2",
                  "fileStatus": "2",
                  "transcodeCount": 0,
                  "studyTime": null
                }
              },
              {
                "id": "00b16312979d11e78441000c2974f54a",
                "siteResourceId": "00b0f2ae979d11e78441000c2974f54a",
                "attachmentInfoId": "7d57fba57c3e11e79d9ef44d3015348b",
                "accessLimit": "11",
                "isdelete": "0",
                "attachment": {
                  "id": null,
                  "achmentId": null,
                  "attachmentName": "情绪研究的新趋向_从有意识情绪到无意识情绪_柳恒超.pdf",
                  "description": null,
                  "userId": "8193",
                  "fileSize": 312098,
                  "ext": "pdf",
                  "isMedia": "0",
                  "mimeType": "application/vnd.ms-xpsdocument",
                  "storageId": "object-c4db1fed14_2016_04_22_09_52_11_HJAA_7972.pdf",
                  "previewStorageId": "object-da390142fc_2016_04_22_09_52_11_ECAB_8443.xps",
                  "sourceId": null,
                  "sourcePic": null,
                  "sourceStatus": null,
                  "sourceUrl": null,
                  "sourceDuration": null,
                  "uploadTime": 1461261132000,
                  "modifyTime": 1461261132000,
                  "browseCount": null,
                  "downloadCount": null,
                  "isDel": "0",
                  "bizType": "2",
                  "fileStatus": "2",
                  "transcodeCount": 0,
                  "studyTime": null
                }
              },
              {
                "id": "00b18515979d11e78441000c2974f54a",
                "siteResourceId": "00b0f2ae979d11e78441000c2974f54a",
                "attachmentInfoId": "7d599c037c3e11e79d9ef44d3015348b",
                "accessLimit": "11",
                "isdelete": "0",
                "attachment": {
                  "id": null,
                  "achmentId": null,
                  "attachmentName": "自尊结构研究新趋向_自尊的双重结构模型_张丽华.pdf",
                  "description": null,
                  "userId": "8193",
                  "fileSize": 151635,
                  "ext": "pdf",
                  "isMedia": "0",
                  "mimeType": "application/vnd.ms-xpsdocument",
                  "storageId": "object-3b6f80d1ff_2016_04_22_09_52_19_JFEC_7700.pdf",
                  "previewStorageId": "object-06a666ae0d_2016_04_22_09_52_19_CBEC_8956.xps",
                  "sourceId": null,
                  "sourcePic": null,
                  "sourceStatus": null,
                  "sourceUrl": null,
                  "sourceDuration": null,
                  "uploadTime": 1461261140000,
                  "modifyTime": 1461261140000,
                  "browseCount": null,
                  "downloadCount": null,
                  "isDel": "0",
                  "bizType": "2",
                  "fileStatus": "2",
                  "transcodeCount": 0,
                  "studyTime": null
                }
              },
              {
                "id": "00b1ab05979d11e78441000c2974f54a",
                "siteResourceId": "00b0f2ae979d11e78441000c2974f54a",
                "attachmentInfoId": "7d5b2f2d7c3e11e79d9ef44d3015348b",
                "accessLimit": "11",
                "isdelete": "0",
                "attachment": {
                  "id": null,
                  "achmentId": null,
                  "attachmentName": "二维自尊量表修订版在中学生群体中的信效度检验_韦嘉.pdf",
                  "description": null,
                  "userId": "8193",
                  "fileSize": 255341,
                  "ext": "pdf",
                  "isMedia": "0",
                  "mimeType": "application/vnd.ms-xpsdocument",
                  "storageId": "object-e602e638e7_2016_04_22_09_53_03_BCFH_2068.pdf",
                  "previewStorageId": "object-b126c97fb5_2016_04_22_09_53_03_JHAG_9781.xps",
                  "sourceId": null,
                  "sourcePic": null,
                  "sourceStatus": null,
                  "sourceUrl": null,
                  "sourceDuration": null,
                  "uploadTime": 1461261184000,
                  "modifyTime": 1461261184000,
                  "browseCount": null,
                  "downloadCount": null,
                  "isDel": "0",
                  "bizType": "2",
                  "fileStatus": "2",
                  "transcodeCount": 0,
                  "studyTime": null
                }
              },
              {
                "id": "00b1cc8d979d11e78441000c2974f54a",
                "siteResourceId": "00b0f2ae979d11e78441000c2974f54a",
                "attachmentInfoId": "7d5ce1077c3e11e79d9ef44d3015348b",
                "accessLimit": "11",
                "isdelete": "0",
                "attachment": {
                  "id": null,
                  "achmentId": null,
                  "attachmentName": "Rosenberg自尊量表中文版条目8的处理_申自力.pdf",
                  "description": null,
                  "userId": "8193",
                  "fileSize": 94442,
                  "ext": "pdf",
                  "isMedia": "0",
                  "mimeType": "application/vnd.ms-xpsdocument",
                  "storageId": "object-e2d765ee8e_2016_04_22_09_53_12_GBBD_7664.pdf",
                  "previewStorageId": "object-1eae870335_2016_04_22_09_53_12_EDDJ_1393.xps",
                  "sourceId": null,
                  "sourcePic": null,
                  "sourceStatus": null,
                  "sourceUrl": null,
                  "sourceDuration": null,
                  "uploadTime": 1461261193000,
                  "modifyTime": 1461261193000,
                  "browseCount": null,
                  "downloadCount": null,
                  "isDel": "0",
                  "bizType": "2",
                  "fileStatus": "2",
                  "transcodeCount": 0,
                  "studyTime": null
                }
              },
              {
                "id": "00b1efd6979d11e78441000c2974f54a",
                "siteResourceId": "00b0f2ae979d11e78441000c2974f54a",
                "attachmentInfoId": "7d5e71527c3e11e79d9ef44d3015348b",
                "accessLimit": "11",
                "isdelete": "0",
                "attachment": {
                  "id": null,
                  "achmentId": null,
                  "attachmentName": "内隐自尊与外显自尊的关系_多重内隐测量的视角_杨福义.pdf",
                  "description": null,
                  "userId": "8193",
                  "fileSize": 301800,
                  "ext": "pdf",
                  "isMedia": "0",
                  "mimeType": "application/vnd.ms-xpsdocument",
                  "storageId": "object-876434e2d5_2016_04_22_09_53_18_DEHB_7570.pdf",
                  "previewStorageId": "object-49d2f1a8ff_2016_04_22_09_53_18_BGJF_4813.xps",
                  "sourceId": null,
                  "sourcePic": null,
                  "sourceStatus": null,
                  "sourceUrl": null,
                  "sourceDuration": null,
                  "uploadTime": 1461261199000,
                  "modifyTime": 1461261199000,
                  "browseCount": null,
                  "downloadCount": null,
                  "isDel": "0",
                  "bizType": "2",
                  "fileStatus": "2",
                  "transcodeCount": 0,
                  "studyTime": null
                }
              }
            ],
            "teachingPlanId": null
          }
        ]
      }
    )
    return {
      status: 200,
      json
    }
  }
})


