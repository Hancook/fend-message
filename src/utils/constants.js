/**
 * Created by hao.wang on 2017/4/6.
 */

import {ENV_PROD_CONFIG} from './env_prod_config'

// localStorge 数据存储keys
export const LOCAL_STORAGE__SESSION = '_absdcdd444sadfs'
export const LOCAL_STORAGE__CUR_ROLE_ID = '402888735c396041015c3e6a96c90095'
export const LOCAL_STORAGE__TEACHER_SELECTED_SUBJECT = '_asdfas44kdfjlk'
export const LOCAL_STORAGE__STUDENT_SELECTED_SUBJECT = '_sakdj444flaskjfkl'
export const LOCAL_STORAGE__BASE_API = '_sakdj444flaskjfkl54545'
export const LOCAL_STORAGE__AUTH_PREV_URL = '_sakdj444flaskjfkl54545111'
export const LOCAL_STORAGE__SEND_QUES = '_sakdj444flaskjfkl5454523c'
export const LOCAL_STORAGE__MESSAGE_TAB_INDEX = '_sakdj444flaskjfkl545452333'

/**
 * 是否是生产环境
 * @type {boolean}
 */
export const IS_ENV_PROD = process.env.NODE_ENV === 'production'

/**
 * 是否是开发环境
 * @type {boolean}
 */
export const IS_ENV_DEV = process.env.NODE_ENV === 'development'

// 模拟api
export const API_BASE_URL_DEV = '/api/'

// 开发api
// export const API_BASE_URL_DEV_TEST = 'http://wxmessage.bigdata.starclink.com:2056/api/v1/'
// export const API_BASE_URL_DEV_TEST = 'http://spmsg.dev3.pre.starclink.com/api/'
// export const API_BASE_URL_DEV_TEST = 'http://10.144.238.69:8920/api/'
// export const API_BASE_URL_DEV_TEST = 'http://192.168.0.119:8920/api/'
//export const API_BASE_URL_DEV_TEST = 'http://10.144.238.91:8920/api/'

// export const SPOC_BASE_URL_DEV_TEST = 'http://starmooc.nercel.cn/starmooc/'
export const API_BASE_URL_DEV_TEST = 'http://twxm.starmooc.nercel.cn/msg/api/'

// 获取开发 apiBaseUrl
function getDevApi() {
  //  获取的优先顺序 启动参数 > localStorage存储 > API_BASE_URL_DEV
  return localStorage.getItem(LOCAL_STORAGE__BASE_API) || API_BASE_URL_DEV_TEST
}
function getDevSpoc() {
  //  获取的优先顺序 启动参数 > localStorage存储 > API_BASE_URL_DEV
  return localStorage.getItem(LOCAL_STORAGE__BASE_API) || API_BASE_URL_DEV_TEST
}

// 开发版 环境配置
export const ENV_DEV_CONFIG = {
  // 版本名
  name: '开发版',
  // 版本编号
  version: '',
  // api
  apiBaseUrl: getDevApi(),
  spocBaseUrl:'http://starmooc.nercel.cn/starmooc/',
}

// 单签环境的环境配置
export const ENV_CONFIG = IS_ENV_DEV ? ENV_DEV_CONFIG : ENV_PROD_CONFIG

ENV_CONFIG.apiBaseUrl = process.env.API_BASE_URL || ENV_CONFIG.apiBaseUrl
ENV_CONFIG.spocBaseUrl = process.env.spocBaseUrl || ENV_CONFIG.spocBaseUrl

// api 用户状态异常 http状态码
export const HTTP_STATUS_TOKEN_INVALID = 403

// 角色名
export const ROLE_NAME_TEACHER = 'TEACHER'
export const ROLE_NAME_STUDENT = 'STUDENT'
export const ROLE_NAME_GUARDIAN = 'GUARDIAN'

// vuex 状态组件
export const STORE__GLOBAL = 'global'
export const STORE__ANSWER = 'answer'

export const STRING_APP_NAME = '云课堂'




