/**
 * Created by hao.wang on 2017/2/8.
 */
import types from './types'
import {getDefaultSession} from './utils.js'
import {setAxiosToken} from '../../utils/common'
import {saveSession} from "./utils";


export default {
  [types.MUTATIONS.setAuthData](state, loginData) {
    state.session.loginData = loginData
    saveSession(state.session)
  },

  [types.MUTATIONS.setToken](state, token) {
    state.session.token = token
    setAxiosToken(token)
    saveSession(state.session)
  },

  [types.MUTATIONS.setTokenData](state, {token, expireAt, corpId, agentType}) {
    state.session.token = {token, expireAt, corpId, agentType}
    setAxiosToken(token)
    saveSession(state.session)
  },

  [types.MUTATIONS.setCorpId](state, corpId) {
    state.session.corpId = corpId
    saveSession(state.session)
  },

  [types.MUTATIONS.resetSession](state) {
    state.session = getDefaultSession()
    saveSession(state.session)
  },

  [types.MUTATIONS.setAgentType](state, agentType) {
    state.session.agentType = agentType
    saveSession(state.session)
  },

  [types.MUTATIONS.setOriginalUrl](state, url) {
    state.session.originalUrl = url
    saveSession(state.session)
  },


  [types.MUTATIONS.setCoverPage](state, {page, data}) {
    state.coverPage.page = page
    state.coverPage.data = data
  },

}
