const namespace = 'global/'
const namespaceRoleIs = namespace + 'role_is/'

export default {
  GETTERS: {
    /**
     * 用户角色列表
     */
    roles: namespace + 'roles',
    /**
     */
    personId: namespace + 'personId',
    /*
     * 用户ID
     */
    usersId: namespace + 'usersId',
    /**
     * 是否已选择角色
     */
    isRoleSelected: namespace + 'isSelectedRole',
    /**
     *
     */
    ticket: namespace + 'ticket',
    /**
     *
     */
    curRoleId: namespace + 'curRoleId',
    /**
     *
     */
    token: namespace + 'token',
    tokenData: namespace + 'tokenData',
    /**
     * 当前已选择的角色
     */
    role: namespace + 'role',
    /**
     * 当前session数据对象
     */
    session: namespace + 'session',
    /**
     * 是否已经登录（已输入用户名密码）
     */
    isLogged: namespace + 'logged',
    /**
     * 当前角色的学校对象
     */
    school: namespace + 'school',
    /**
     * 全局遮罩页面
     */
    coverPage: namespace + 'coverPage',

    corpId: namespace + 'corpId',
    agentType: namespace + 'agentType',
    loginData: namespace + 'loginData',
    /**
     * 当前角色判断
     */
    ROLE_IS: {//当前角色
      teacher: namespaceRoleIs + 'teacher',
      guardian: namespaceRoleIs + 'guardian',
      student: namespaceRoleIs + 'student',
    },
  },
  ACTIONS: {
    /**
     * 登出 清除登录状态
     */
    loginOut: namespace + 'loginOut',
    clearCoverPage: namespace + 'clearCoverPage',
  },
  MUTATIONS: {
    setAuthData: namespace + 'setAuthData',
    resetSession: namespace + 'resetSession',
    setTokenData: namespace + 'setTokenData',
    setToken: namespace + 'setToken',
    setCurRole: namespace + 'setRole',
    setCorpId: namespace + 'setCorpId',
    setAgentType: namespace + 'setAgentType',
    setCoverPage: namespace + 'setCoverPage',
    setOriginalUrl:namespace+'setOriginalUrl',
  }
}
