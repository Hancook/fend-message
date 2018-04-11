import types from './types'

let actions = {}
export default actions

// 登出 清除登录状态
actions[types.ACTIONS.loginOut] = ({commit}) => {
  commit(types.MUTATIONS.resetSession)
}

actions[types.ACTIONS.clearCoverPage] = ({commit}) => {
  commit(types.MUTATIONS.setCoverPage, {page: '', data: null})
}



