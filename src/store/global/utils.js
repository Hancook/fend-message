/**
 * Created by hao.wang on 2017-4-11.
 */
import {setStorageDataAndEncode} from "../../utils/common"
import {LOCAL_STORAGE__SESSION} from "../../utils/constants"

export const getDefaultSession = function () {
  return {
    token: null, // {token,expireAt,corpId}
    loginData: { // 当前登录信息（角色列表，ticket）
    },
    corpId: null,
    agentType: null,
    curRoleId: null,// 当前角色id
    originalUrl:null,//跳转时上次地址
  }
}

export const saveSession = function (session) {
  // console.log('saveSession:', session)
  setStorageDataAndEncode(LOCAL_STORAGE__SESSION, session)
}
