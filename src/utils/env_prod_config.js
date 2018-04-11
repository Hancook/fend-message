/**
 * 生产版本 多环境配置
 * Created by hao.wang on 2017-6-4.
 */
import {IS_ENV_PROD} from './constants'

// 预览演示版
export const ENV_PROD_PROFILE_PREVIEW = 'pre'
// 正式版
export const ENV_PROD_PROFILE_PROD = 'prod'
// 测试版
export const ENV_PROD_PROFILE_TEST = 'test'

export const ENV_PROD_PROFILE = process.env.ENV_PROD_PROFILE
export const version = process.env.ENV_PROD_PROFILE

export const ENV_PROD_CONFIG = {
  [ENV_PROD_PROFILE_PROD]: {
    // 版本名
    name: '正式版',
    // 版本编号
    version,
    // api
    apiBaseUrl: 'http://t.spoc.ccnu.edu.cn/msg/api/',
    spocBaseUrl:'http://spoc.ccnu.edu.cn/',
  },
  [ENV_PROD_PROFILE_PREVIEW]: {
    name: '预览版',
    version,
    apiBaseUrl: 'http://t.spoc.ccnu.edu.cn/msg/api/',
    spocBaseUrl:'http://starmooc.nercel.cn/starmooc/',
  },
  [ENV_PROD_PROFILE_TEST]: {
    name: '测试版',
    version,
    apiBaseUrl: 'http://twxm.starmooc.nercel.cn/msg/api/',
    spocBaseUrl:'http://starmooc.nercel.cn/starmooc/',
  },
}[ENV_PROD_PROFILE]

// 入口url ${location.origin}/#/?_corpId=wx8bc2ea4a22988417&_agentType=NOTICE

if (IS_ENV_PROD && !ENV_PROD_CONFIG) {
  throw `未知的生产版本 ${ENV_PROD_PROFILE}`
}
