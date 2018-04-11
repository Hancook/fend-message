import types from './types'
import * as constants from '../../utils/constants'
import * as _ from 'lodash'

let getters = {}
export default getters

getters[types.GETTERS.session] = state => {
  return state.session
}

// 当前用户角色列表
getters[types.GETTERS.roles] = state => {
  return state.session.loginData.users
}

// 当前用户选择的角色（身份）
getters[types.GETTERS.role] = state => {
  if (state.session.loginData.users) {
    return _.find(state.session.loginData.users, role => !!role.id && role.id == state.session.curRoleId)
  }
  return null
}

// 当前用户选择的角色是否是教师
getters[types.GETTERS.ROLE_IS.teacher] = (state, getters) => {
  let role = getters[types.GETTERS.role]
  return !!(role && role.userRole == constants.ROLE_NAME_TEACHER)
}
// 当前用户选择的角色是否是家长
getters[types.GETTERS.ROLE_IS.guardian] = (state, getters) => {
  let role = getters[types.GETTERS.role]
  return !!(role && role.userRole == constants.ROLE_NAME_GUARDIAN)
}
// 当前用户选择的角色是否是学生
getters[types.GETTERS.ROLE_IS.student] = (state, getters) => {
  let role = getters[types.GETTERS.role]
  return !!(role && role.userRole == constants.ROLE_NAME_STUDENT)
}

getters[types.GETTERS.personId] = state => {
  let role = getters[types.GETTERS.role]
  return role.personId
}

getters[types.GETTERS.ticket] = state => {
  return state.session.loginData.ticket
}

getters[types.GETTERS.curRoleId] = state => {
  return state.session.curRoleId
}

getters[types.GETTERS.token] = state => {
  return state.session.token
}

getters[types.GETTERS.tokenData] = state => {
  return state.session.token
}

getters[types.GETTERS.corpId] = state => {
  return state.session.corpId
}

getters[types.GETTERS.agentType] = state => {
  return state.session.agentType
}

getters[types.GETTERS.loginData] = state => {
  return state.session.loginData
}

// 是否已登录 [:Boolean]
getters[types.GETTERS.isLogged] = state => {
  return !!state.session.ticket
}

getters[types.GETTERS.isRoleSelected] = (state, getters) => {
  let role = getters[types.GETTERS.role]
  return !!role
}

// 获取当前身份的学校信息
// {
//   schoolId:"6a4e96f9ccb246f6a327d9af7cfba656",
//   schoolName:"童乐幼教",
//   schoolSegmentCode:"P",
//   schoolSegmentName:"初中",
//   schoolType:"JUNIOR",
// }
getters[types.GETTERS.school] = (state, getters) => {
  let role = getters[types.GETTERS.role]
  return role && role.school
}

getters[types.GETTERS.coverPage] = (state, getters) => {
  return state.coverPage
}



