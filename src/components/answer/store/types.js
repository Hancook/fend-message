const namespace = 'answer/'

export default {
  getters: {
    answers: namespace + 'answers',
  },
  actions: {
    /**
     * 登出 清除登录状态
     */
    loginOut: namespace + 'loginOut',
  },
  mutations: {
    setAnswer: namespace + 'setAnswer',
    setPostedAnswers: namespace + 'setPostedAnswers',
  }
}
