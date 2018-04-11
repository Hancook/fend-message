import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import global from './global'
import * as constants from '../utils/constants'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    [constants.STORE__GLOBAL]: global()
  },
  strict: debug
})
