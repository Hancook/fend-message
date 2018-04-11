/**
 * Created by hao.wang on 2017-4-10.
 */
import Vue from 'vue'
import * as constants from './constants'
import {IS_ENV_DEV, ROLE_NAME_GUARDIAN, ROLE_NAME_STUDENT, ROLE_NAME_TEACHER} from './constants'
import entry from './entry.js'
import _ from 'lodash'
import * as axios from 'axios'
import {sync} from 'vuex-router-sync'
import vueFilter from 'vue-filter'
import types from '../store/global/types'
import {MessageBox, Toast} from 'mint-ui'
// import { imagePreview } from '../components/_common/st_wx/utils/WxUtils'
import {imagePreview} from 'st_wx/utils/WxUtils'

/**
 * 格式化秒数为
 * @param seconds
 */
export const parseSecondToTime = function (seconds, unitSec = '秒', unitMiu = '分', unitHour = '小时') {
  let res
  let sec = seconds % 60
  res = '' + sec + unitSec
  if (sec > 0) {
    res = sec + unitSec
  }

  if (seconds >= 60) {
    let miu = Math.floor(seconds % (60 * 60) / 60)
    if (miu > 0) {
      res = miu + unitMiu
    }
  }
  if (seconds >= 60 * 60) {
    let hour = Math.floor(seconds / 60 * 60)
    if (hour > 0) {
      res = hour + unitHour
    }
  }
  return res
}

const ROLE_NAMES_MAP = {
  [ROLE_NAME_TEACHER]: ['我是教师', '我是教师'],
  [ROLE_NAME_STUDENT]: ['我是学生', '我是学生'],
  [ROLE_NAME_GUARDIAN]: ['我是家长', '我是家长'],
}

/**
 * 获取角色名称
 */
export const getRoleName = function (role) {
  return (ROLE_NAMES_MAP[role] || [])[0]
}

/**
 * clone
 */
export const cloneData = function (data) {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 获取角色名称
 */
export const getRoleCall = function (role) {
  return (ROLE_NAMES_MAP[role] || [])[1]
}

export const getClassOfScoreRate = function (scoreRate) {
  if (!_.isNumber(scoreRate)) {
    return ''
  }
  return ['color_difen', 'color_jige', 'color_youxiu'][getRateClassIndex(scoreRate)]
}

export const getRateClassIndex = function (rate_score) {
  let ratePercent = rate_score * 100
  if (0 <= ratePercent && ratePercent < 60) {
    return 0
  }
  if (60 <= ratePercent && ratePercent < 80) {
    return 1
  }
  if (80 <= ratePercent && ratePercent <= 100) {
    return 2
  }
  return -1
}

export const notNullAndEmpty = function (data) {
  return data && _.isEmpty(data)
}

export const getAnyParamFromRoute = function (route, paramNames) {
  const query = route.query
  const params = route.params
  for (let nIndex in paramNames) {
    let name = paramNames[nIndex]
    let val = query[name] || params[name]
    if (val !== 0 || !!val) {
      return val
    }
  }
  return null
}

//PRIMARY("小学"), NURSERY("幼儿园"), JUNIOR("初中"), SENIOR("高中")
let
  SCHOOL_TYPES = {
    'PRIMARY': '小学',
    'NURSERY': '幼儿园',
    'JUNIOR': '初中',
    'SENIOR': '高中'
  }
/**
 * 获取学校类型名称
 */
export const getSchoolTypeName = function (schoolType) {
  return SCHOOL_TYPES[schoolType]
}

/**
 * 删除obj value为空字符串的key 并返回
 * @param obj
 * @return {*}
 */
export const getObjEmptyStrRemoved = function (obj) {
  if (_.isEmpty(obj)) {
    return obj
  }
  return _.pickBy(obj, item => item !== '')
}

/**
 * axios请求失败通用处理逻辑
 * @param response axios response
 * @param vm 当前vm实例
 */
export const catchAxiosError = function (error, vm, message) {

  if (error == null || vm == null) {
    Toast('catchAxiosError:error or vm is null!')
    return
  }

  if (vm._isDestroyed) {
    // debug && Toast('页面已destroy，异常:', error)
    return
  }

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('error1:', error.response.status)
    // console.log('error1:', error.response.data)
    // console.log('error1:', error.response.headers)

    if (error.response.status == 401) {
      vm.$store.dispatch(types.ACTIONS.loginOut)
      Toast('登陆过期，重新登录...')
      setTimeout(function () {
        location.reload()
      }, 2000)
    } else {
      Toast('请求异常 ' + (error.response.status || ''))
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('error2:', error.request)
    Toast('请求无数据返回 ')
  } else {
    // Something happened in setting up the request that triggered an Error
    console.warn('error3:', error)
    Toast('请求出错 ' + (message || error.message || ''))
  }

}

/**
 * app初始化，注入一些插件，vue原型属性和方法
 */
export function appInitInject(store, router) {
  // 同步route实例到vuex
  sync(store, router) // done.

  // 注入原型工具类方法
  window.axios = Vue.prototype.$axios = axios
  window._ = Vue.prototype.$_ = _
  Vue.prototype.$$ = window.jQuery || window.Zepto || window.$


  axios.defaults.baseURL = constants.ENV_CONFIG.apiBaseUrl
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  //
  Vue.mixin({
    mounted() {
      this.$$el = $(this.$el)
    }
  })

  // Vue.prototype.$msgbox = MessageBox
  // Vue.prototype.$alert = MessageBox.alert
  // Vue.prototype.$confirm = MessageBox.confirm
  // Vue.prototype.$prompt = MessageBox.prompt

  // router.beforeEach((to, from, next) => {
  //   if (location.pathname === entry.app) {
  //     if (store.getters[types.GETTERS.isLogged] && store.getters[types.GETTERS.isRoleSelected]) {
  //       location.href = entry.app_study_evaluate
  //       return
  //     }
  //   }
  //   next()
  // })
  // 首页已登录 进入主页

  initWxPreivew()

}

/**
 * 初始化微信图片预览
 */
function initWxPreivew() {

  $(document).on('click', '[data-preview]', function () {
    const $this = $(this)
    let current = $this.data('preview')
    let $parent = $this.parents('[data-previews]')
    if (!$parent.length) {
      $parent = $this.parent()
    }
    let images = $parent.find('[data-preview]').map((index, el) => $(el).data('preview')).get()
    imagePreview(images, current)
  })

  $(document).on('click', '[data-previews]', function () {
    const $this = $(this)
    var previews = $this.data('previews')
    console.log({
      previews,
      isString: typeof previews
    })
    if ((typeof  previews) === 'string') {
      try {
        previews = eval(previews)
      } catch (e) {
      }
    }
    console.log({
      previews,
      isString: typeof previews
    })
    if (Array.isArray(previews) && previews.length) {
      imagePreview(previews, previews[0])

    } else {
      console.warn('previews is not non empty array:', previews)
    }
  })
}

export function getTimeStr(value) {
  return Math.floor(value / 60) + '分' + (value % 60) + '秒'
}

export const getTestType = function (value) {
  if (value == 0) {
    return '随堂考'
  } else if (value == 1) {
    return '周考'
  } else if (value == 2) {
    return '月考'
  } else if (value == 3) {
    return '期中考'
  } else if (value == 4) {
    return '期末考'
  } else if (value == 5) {
    return '模拟考'
  }

}
export const judgeQuestion = function (value) {
  if (value == '0	<br/>') {
    return '错误'
  } else {
    return '正确'
  }

}

function nullZero() {
  if (value == '') {
    return '0'
  }
}

export function registerFilters() {

  Vue.use(vueFilter)

  Vue.filter('sd_judge', judgeQuestion)

  Vue.filter('sd_percent', getPercent)

  Vue.filter('sd_tail_zero_clear', getTailZeroClear)

  Vue.filter('time', getTimeStr)

  Vue.filter('testtype', getTestType)

  Vue.filter('nullZero', nullZero)

  Vue.filter('jsonPretty', (data) => JSON.stringify(data, '', 2))

  Vue.filter('sd_date', date => Vue.options.filters.date(date, '%Y-%m-%d %T'))
  Vue.filter('spoc_date', date => Vue.options.filters.date(date, '%Y/%m/%d %H:%M'))

  Vue.filter('spoc_date_sim', date => Vue.options.filters.date(date, '%y/%m/%d %H:%M'))

  Vue.filter('sd_date_mdhM', date => Vue.options.filters.date(date, '%m-%d %H:%M'))

  Vue.filter('sd_date_ymd', date => Vue.options.filters.date(date, '%Y-%m-%d'))

  Vue.filter('logError', (data) => {
    Toast(JSON.parse(JSON.stringify(data)))
    return ''
  })


  Vue.filter('log', data => {
    console.log(JSON.parse(JSON.stringify(data)))
    return ''
  })

}

/**
 * 通过序号获取ABCD选项 1+ => A+
 * @param sort
 * @return {string}
 */
export const getOptionBySort = function (sort) {
  return String.fromCharCode('A'.charCodeAt(0) + (sort - 1))
}

/**
 * 小数转百分数 0.233=>23
 * @param decimal 小数 0.11212
 * @param toFixed 百分数小数位（默认没有小数位）（小数位为0，默认不显示） 1=>23.1
 * @return (0.110,1)=>11 (0.2323,2)=>23.23
 */
export const getPercent = function (decimal, toFixed) {
  return getTailZeroClear(decimal * 100, toFixed)
}

/**
 * 小数去零
 * @param
 * @param
 * @return
 */
export const getTailZeroClear = function (decimal, toFixed) {
  toFixed = toFixed || 0
  decimal = (decimal).toFixed(toFixed)
  return Number(decimal).toString()
}

/**
 * (2,2)=>02,(2,3)=>002
 * @param num
 * @param bits
 */
function fixed2NbitNumber(num, bits) {
  let numStr = String(num)
  let dur = bits - numStr.length
  if (dur > 0) {
    numStr = Array(dur + 1).join('0') + numStr
  }
  return numStr
}

/**
 * (60)=>00:01:00
 * (3661)=>01:01:01
 * @param totalSeconds 秒数
 * @return {string}
 */
export const getClockStr = function (totalSeconds) {
  let seconds = Math.floor(totalSeconds % 60)
  let minutes = Math.floor((totalSeconds / 60) % 60)
  let hour = Math.floor(totalSeconds / (60 * 60))
  return [fixed2NbitNumber(hour, 2), fixed2NbitNumber(minutes, 2), fixed2NbitNumber(seconds, 2)].join(':')
}

/**
 * 获取平层的题目列表，subType带中文编号
 * @param ilaPaper 评估卷内容
 * @return {string}
 */
export function getSubQuestionOrderList(ilaPaper) {
  let firstIndex = 0
  let subtypeIndex = 0
  let types = _.map(ilaPaper.subtype_ids, subtype_id => {
      let subtype = {}
      subtype.name = formatChineseNum(subtypeIndex) + '、' + ilaPaper.subtypes[subtype_id].name
      let subtypeQuestions = []
      _.forEach(ilaPaper.subtype2subtype_question_ids[subtype_id], (subtype_question_id) => {
        let subtypeQuestion = ilaPaper.subtype_questions[subtype_question_id]
        if (subtypeQuestion.parent_id === -2) {
          //添加tzt至question数组中
          subtypeQuestions = subtypeQuestions.concat(_.map(ilaPaper.subtype_question2lv2_ids[subtypeQuestion.id],
            (tztId, secondIndex) => {
              firstIndex++
              return {
                // 'num': firstIndex + '-' + (secondIndex + 1),
                'num': firstIndex,
                'id': tztId
              }
            }))
        } else {
          firstIndex++
          subtypeQuestions.push({
            'num': firstIndex,
            'id': subtypeQuestion.id
          })
        }
      })
      subtype.subtype_questions = subtypeQuestions
      subtype.question_type_id = ilaPaper.subtypes[subtype_id].questiontype_id
      subtypeIndex++
      return subtype
    }
  )
  return types
}

/**
 * 获取平层的题目列表
 * @param paper
 * @return
 * <pre> 扩展 paper
 *   [
 *    subtype
 *      _subtype_questions
 *        [
 *          subtype_question
 *            _sort_index 题号0+
 *            _subtype_question2lv2 题组题子题目
 *              []
 *            _question
 *              _choices
 *            _choices
 *        ]
 *  ]
 *  </pre>
 */
export function getTransformPaperSubtypesData(paper) {
  // console.log(paper)
  let _sort_index = 0
  return paper['subtype_ids'].map((subtype_id) => {
    let subtype = paper['subtypes'][subtype_id]
    let subtype_question_ids = paper['subtype2subtype_question_ids'][subtype_id]
    let subtype_questions = subtype_question_ids.map(
      subtype_question_id => paper['subtype_questions'][subtype_question_id]
    )

    subtype._subtype_questions = subtype_questions

    subtype_questions.forEach((subtype_question, subtype_questionIndex) => {

      let is_tzt_parent = subtype_question['is_tzt_parent']
      let is_tzt_parentP = subtype_question['isobjective'] == -2

      _transformPaperSetChoices(subtype_question, paper)

      // 设置当前题目题号
      subtype_question._sort_index = _sort_index++

      // 设置当前题主题的子题目题号和选项
      if (is_tzt_parent) {

        let subtype_questions = (paper['subtype_question2lv2_ids'][subtype_question.id] || []).map(
          subtype_question_id => paper['subtype_questions_lvl2'][subtype_question_id]
        )

        subtype_question._subtype_question2lv2 = subtype_questions

        subtype_questions.forEach(subtype_question => {
          _transformPaperSetChoices(subtype_question, paper)
          is_tzt_parentP && _sort_index++
        })
      }

    })
    return subtype
  })
}

function _transformPaperSetChoices(subtype_question, lasPaper) {
  let question = lasPaper['questions'][subtype_question['questionid'] || subtype_question['question_id']]
  subtype_question._question = question
  // console.log({subtype_question_id: subtype_question.id, question})
  let choices = lasPaper['question2choice_ids'][question.id].map(choice_id => lasPaper['choices'][choice_id])
  subtype_question._choices = choices
  question._choices = choices
}

// 对错状态值对应class
const IS_RIGHT_2_STYLE_CLASS = {
  1: 'sd_right_icon',
  0: 'sd_wrong_icon',
  10: 'sd_half_right_icon',
}

/**
 * 获取对错状态值对应class
 * 默认 错
 */
export function getRightStyleClass(is_right) {
  return IS_RIGHT_2_STYLE_CLASS[is_right] || IS_RIGHT_2_STYLE_CLASS[0]
}

/**
 * 获取用户选项答案与正确答案的对比结果
 * @param rightChoices ['']
 * @param userChoices ['']
 * @return {number} 1全对 0半对 -1全错
 */
export function getAnswerRightStatus(rightChoices, userChoices) {
  let vm = this
  let difference = vm.$_.difference(rightChoices, userChoices)
  let intersection = vm.$_.intersection(rightChoices, userChoices)
  if (!difference.length) {
    return 1// 全对
  } else if (intersection.length) {
    return 0//半对
  }
  return -1//全错
}
/**
 * 全局将"\n"替换为'<br />'
 */
export function getTitleContent(val) {
  if(val!=null){
    let content = val.replace(new RegExp("\n", 'g'), '<br />')
    return content
  }
}
/**
 * 设置 token
 */
export function setAxiosToken(token) {
  // 测试用，过期token
  // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjhhMTA2ZWM0NWMyZWM4ZTMwMTVjMmVjOTNiODMwMDAwIiwidXNlcl9pZCI6MTUsImVtYWlsIjpudWxsLCJleHAiOjExOTU1MzA1MTF9.ZXkFDEOtm4XDZMo7RuzHVmb89MJj_vpCZ9jCvVuQH-M'
  axios.defaults.headers.common['Authorization'] = getAuthorizationTokenHeaderValue(token)
}

export function getAuthorizationTokenHeaderValue(token) {
  // return 'JWT ' + token
  return token
}

const CHN_NUM_CHAR = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四',
  '十五', '十六', '十七', '十八', '十九', '二十']

/**
 * 获取汉字数字 [0,1,2,3]=>['一', '二', '三', '四']
 * @return num 0+
 */
export function formatChineseNum(num) {
  return CHN_NUM_CHAR[num]
}

const b64Disabled = false

/**
 * base64 编码
 * @param str
 * @return {string}
 */
export function b64EncodeUnicode(str) {
  if (IS_ENV_DEV || b64Disabled) {
    return str
  }
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1)
  }))
}

/**
 * base64 解码
 * @param str
 * @return {string}
 */
export function b64DecodeUnicode(str) {
  if (IS_ENV_DEV || b64Disabled) {
    return str
  }
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

/**
 * 存储 storage 数据，并base64 编码
 */
export function setStorageDataAndEncode(key, value) {
  let json = JSON.stringify(value)
  localStorage.setItem(key, b64EncodeUnicode(json))
}

/**
 * 获取 storage 数据，并base64 解码
 * @return Object
 */
export function getStorageDataAndDecode(key) {
  let json = localStorage.getItem(key)
  if (json != null) {
    try {
      let jsonDecode = b64DecodeUnicode(json)
      return JSON.parse(jsonDecode)
    } catch (e) {
    }
  }
  return null
}

/**
 *
 * @param choices
 * <pre>
 *    [choice:{iscorrect}]
 * </pre>
 *
 * @return A,B,C
 */
export function getRightChoicesSortStr(choices) {
  return (choices || []).reduce((sorts, choice, index) => {
    choice.iscorrect == 1 && sorts.push(getOptionBySort(index + 1))
    return sorts
  }, []).sort().join(',')
}

/**
 * 锚点到某个dom 依赖全局 jquery
 */
export function goToDomElement(dom) {
  $('html, body').animate({
    scrollTop: ($(dom).offset().top - 100) + 'px'
  }, 'fast')
}

/**
 * 检查是否有权限访问当前路由 通过 meta.limitRoles 判断
 * @param router
 * @param store
 */
export function checkedPrivilageRoute4UserRole(router, store) {

  router.beforeEach((to, from, next) => {
    // console.log('beforeRouteEnter:', to, from)
    let limitRoles = _.reduce(to.matched, (limitRoles, route) => (limitRoles.concat(route.meta.limitRoles || [])), [])

    // console.log({limitRoles})

    if (_.isEmpty(limitRoles)) {
      next()
    } else {
      let role = store.getters[types.GETTERS.role]
      let userRole = (role || {})['userRole']

      // 当前角色信息为空时，回到首页
      if (_.isEmpty(role) || _.isEmpty(userRole)) {
        Toast('当前角色信息异常 ', limitRoles, '回到主页')
        window.location.href = entry.app
      }

      if (limitRoles.indexOf(userRole) != -1) {
        next()
      } else {
        Toast('缺少权限访问路由 ', limitRoles, '回到主页')
        window.location.href = entry.app
      }
    }
  })

}

export const getMatchedRouteTitle = function (matchedRoute) {
  const metaTitle = matchedRoute.meta.title
  const vm = matchedRoute.instances.default
  // console.log({vm, instances: matchedRoute.instances})
  if (vm == null) {
    return metaTitle
  }
  // console.log({vm, $options: vm.$options})
  const title = vm.$options.title
  return _.isFunction(title) ? title.call(vm) : (title || metaTitle )
}

/**
 * 设置页面 title，通过路由 vm.title 或者 $route.meta.title 读取当前路由组件的title
 * @param vm
 */
export function setRouteTitle(route) {
  const titles = route.matched.map(item => getMatchedRouteTitle(item)).filter(title => !_.isEmpty(title))
  // console.log(titles)
  if (!_.isEmpty(titles)) {
    document.title = titles.join(' | ')
  }
}

export const watchAndSetRouteTitle = function () {
  const _setRouteTitle = _.debounce(setRouteTitle, 100)
  Vue.mixin({
    mounted() {
      const vm = this
      vm.$route && _setRouteTitle(vm.$route)
    },
  })
}

/**
 * 获取 hash
 * @return {string}
 */
export const getHash = function () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  let href = window.location.href
  let index = href.indexOf('#')
  return index === -1 ? '' : href.slice(index + 1)
}

/**
 * 获取 url query
 * @return {string}
 */
export const parseQuery = function (query) {
  let res = {}
  if (query) {
    query = query.trim().replace(/^(\?|#|&)/, '')
  } else {
    return
  }
  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    let parts = param.replace(/\+/g, ' ').split('=')
    let key = decodeURIComponent(parts.shift())
    let val = parts.length > 0
      ? decodeURIComponent(parts.join('='))
      : null

    if (res[key] === undefined) {
      res[key] = val
    } else if (Array.isArray(res[key])) {
      res[key].push(val)
    } else {
      res[key] = [res[key], val]
    }
  })
  return res
}

/**
 * 获取 hash 路由 query
 * @return {string}
 */
export const getRouteQuery = function () {
  return parseQuery(getHash().split('?')[1]) || {}
}

/**
 * 获取 route
 * @return {path,query}
 */
export const parseRoute = function () {
  const hashSplit = getHash().split('?')
  const path = hashSplit[0]
  const query = parseQuery(hashSplit[1]) || {}
  return {path, query}
}

/**
 * 拆分 '【前缀】内容' 为2元数组
 * @param title
 * @return {*}
 */
export const splitTitle = function (title) {
  if (title) {
    title = title.trim()
    var pEndIndex = title.indexOf('】')
    if (title.startsWith('【') && pEndIndex != -1) {
      var prefix = title.substring(1, pEndIndex)
      var content = title.substr(pEndIndex + 1)
      return [prefix, content]
    }
  }
  return ['', title]
}

/**
 * 拆分 '【前缀】内容' 为2元数组
 * @param title
 * @return {*}
 */
export const timeChange = function (dateTimeStamp) {
  if (dateTimeStamp) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if(diffValue < 0){
      //若日期不符则弹出窗口告之
      //alert("结束日期不能小于开始日期！");
    }
    var monthC =diffValue/month;
    var weekC =diffValue/(7*day);
    var dayC =diffValue/day;
    var hourC =diffValue/hour;
    var minC =diffValue/minute;
    if(monthC>=1){
      return  parseInt(monthC) + "个月前";
    }
    else if(weekC>=1){
      return  parseInt(weekC) + "周前";
    }
    else if(dayC>=1){
      return parseInt(dayC) +"天前";
    }
    else if(hourC>=1){
      return parseInt(hourC) +"小时前";
    }
    else if(minC>=1){
      return  parseInt(minC) +"分钟前";
    }else
      return "刚刚发布";

  }
}

