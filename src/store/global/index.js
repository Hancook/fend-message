import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import * as constants from '../../utils/constants'
import {getDefaultSession} from './utils.js'
import {getStorageDataAndDecode, setAxiosToken} from '../../utils/common'

Vue.use(Vuex)

export default function () {

  let session = getStorageDataAndDecode(constants.LOCAL_STORAGE__SESSION) || getDefaultSession()
  // console.log('store index:', {session})

  setAxiosToken((session.token || {}).token)

  const state = {
    /**
     * 登录相关状态
     */
    session,
    coverPage: {
      page: '',
      data: null,
    }
  }

  return {
    state,
    actions,
    getters,
    mutations
  }
}
