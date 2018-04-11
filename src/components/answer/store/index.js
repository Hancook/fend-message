import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default function () {

  const state = {
    /**
     * 题目答案
     */
    answers: {
      // 'xx1': [],
    }
  }

  return {
    state,
    actions,
    getters,
    mutations
  }
}
