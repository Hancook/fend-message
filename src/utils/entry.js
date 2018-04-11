/**
 * 入口多环境配置
 * Created by hao.wang on 2017/3/29.
 */
let dev = {
  app: '/',
  app_message_notice: '/index_notice.html',
  app_study_evaluate: '/index_evaluate.html',
}

let prod = {
  app: '/',
  app_message_notice: '/index_notice.html',
  app_study_evaluate: '/index_evaluate.html',
}

export  default (process.env.NODE_ENV === 'production' && process.env.RENAME_ENTRY_ROUTE) ? prod : dev
