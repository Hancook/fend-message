import _router from '../components/_page/_router'

export default [
  {
    path: '/',
    component: require('../components/WxAuth.vue'),
    meta: {
      needAuth: false
    },
  },
  {
    path: '/devlogin',
    component: require('../components/DevLogin.vue'),
    meta: {
      needAuth: false
    },
  },
  {
    path: '/authing',
    component: require('../components/WxAuth.vue'),
    meta: {
      needAuth: false
    },
  },
  {
    path: '/main',
    component: require('../components/Main.vue'),
    meta: {
      needAuth: true
    },
    children: [
      {path: '/', redirect1: 'sign', redirect: 'seminar'},
      {
        path: 'sign',
        meta: {
          title: '签到',
        },
        desc: '签到',
        component: require('../components/sign/PageSign.vue'),
      },
      {
        path: 'answer',
        meta: {
          title: '问卷调查',
          needAuth: true
        },
        desc: '问卷调查',
        component: require('../components/answer/PageIndex.vue'),
      },
      {
        path: 'answer_send',
        meta: {
          title: '发送问卷',
          needAuth: false
        },
        desc: '发送问卷',
        component: require('../components/answer/PageSend.vue'),
      },
      {
        path: 'answer_send_reset',
        meta: {
          title: '发送问卷_清除',
          needAuth: false,
          resetSent: true,
        },
        desc: '发送问卷_清除',
        component: require('../components/answer/PageSend.vue'),
      },
      {
        path: 'message',
        meta: {
          title: '通知公告',
          needAuth: true
        },
        desc: '通知公告',
        component: require('../components/message/PageIndex.vue'),
      },
      {
        path: 'message/:id',
        meta: {
          title: '通知详情',
          needAuth: true
        },
        desc: '通知详情',
        component: require('../components/message/clazz_notice/PageShow.vue'),
      },
      // {
      //   path: 'seminar',
      //   meta: {
      //     title: '学习交流',
      //     needAuth: true
      //   },
      //   desc: '学习交流',
      //   component: require('../components/seminar/SeminarPageIndex.vue'),
      // },
      {
        path: 'course_list',
        meta: {
          title: '课程列表',
          needAuth: true
        },
        desc: '课程列表',
        component: require('../components/course/PageList.vue'),
      },
      {
        path: 'course',
        meta: {
          title: '课程学习',
          needAuth: true
        },
        desc: '课程学习',
        component: require('../components/course/PageIndex.vue'),
        children: [
          {path: '/', redirect: 'course_content'},
          {
            path: 'course_content',
            name: '课程内容',
            component: require('../components/course/PageShow.vue'),
          },
          {
            path: 'my_homework',
            name: '我的学习',
            component: require('../components/course/MyHomework/MyHomework.vue'),
            children: [
              {path: '/', redirect: 'no_committed'},
              {
                path: 'no_committed',
                name: '未提交',
                component: require('../components/course/MyHomework/NoCommitted.vue'),
              },
              {
                path: 'submitted',
                name: '已提交',
                component: require('../components/course/MyHomework/Submitted.vue'),
              }
            ]
          },
          {
            path: 'study_discuss',
            name: '学习交流',
            component: require('../components/course/SeminarIndex.vue'),
          },
          {
            path: 'seminar_detail',
            meta: {
              title: '回复详情',
              needAuth: true
            },
            desc: '回复详情',
            component: require('../components/course/SeminarDetail.vue'),
          },
        ]
      },
      // {
      //   path: 'course/:id',
      //   meta: {
      //     title: '我的作业',
      //     needAuth: true
      //   },
      //   desc: '我的作业',
      //   component: require('../components/course/PageShow.vue'),
      // },
      {
        path: 'jssdk_test',
        meta: {
          title: 'jssdk测试',
          needAuth: true
        },
        desc: 'jssdk测试',
        component: require('../components/test/PageJssdkTest.vue'),
      },
    ]
  },
  {
    path: '/dev_login',
    name: 'DevLogin',
    meta: {
      title: '测试登录',
    },
    component: require('../components/DevLogin.vue'),
    desc: '测试登录'
  },
  ..._router
]
