/**
 * Created by hao.wang on 2017/2/8.
 */
import types from './types'

export default {
  [types.mutations.setAnswer](state, {qId, answer}) {

    const data = {
      answers: answer,
      posted: null,
    }

    if (qId in state.answers) {
      state.answers[qId] = data
    } else {
      Vue.set(state.answers, qId, data)
    }
  },
  [types.mutations.setPostedAnswers](state, posted) {
    state.answers = {
      ...state.answers,
      ...posted
    }
  },
}
