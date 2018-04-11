export default [
  {
    path: '/route',
    name: 'route',
    component: require('./_routes.vue'),
    meta: {
      title: '路由表',
    },
    desc: '路由表'
  },
  {
    path: '/_error', component: require('./_error.vue'),
    meta: {
      title: '出错了',
    },
    desc: '出错页面'
  },
  {
    path: '/_msg', component: require('./_msg.vue'),
    meta: {
      title: '提示',
    },
    desc: '_msg'
  },
  {
    path: '/_warn', component: require('./_warn.vue'),
    meta: {
      title: '提示',
    },
    desc: '_warn'
  },
  {
    path: '*', component: require('./_404.vue'),
    meta: {
      title: '404',
    },
    desc: '_404'
  }// 404 此路由一定要是最后一条
]
