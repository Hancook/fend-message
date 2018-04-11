/***
 * 微信授权处理器 检查授权
 * @type {{}}
 */
import axios from 'axios'
import types from '../store/global/types'
import {IS_ENV_DEV} from './constants'
import {parseRoute} from "./common";
import {common_loginOut} from "./vm_methods_common";


export const OPTS_DEFAULTS = {
  // 是否已经授权
  isAuth({store, corpId}) {
    // log('isAuth state:', store.state.global.session.token)
    let vxGlobal_Token = store.getters[types.GETTERS.tokenData]
    if (!vxGlobal_Token) {
      // log('vxGlobal_Token 为空')
      return false
    }
    // if (!corpId) {
    //   log('corpId 为空')
    //   return false
    // }
    // corpId 不为空，且和已经授权的corpId不一致时，重新授权
    if (!!corpId && vxGlobal_Token.corpId != corpId) {
      log('vxGlobal_Token.corpId != corpId', vxGlobal_Token.corpId, corpId)
      return false
    }
    const expireAt = (vxGlobal_Token || {})['expireAt']
    // log({expireAt, expireAtStr: new Date(expireAt)})
    if (!expireAt || (expireAt - Date.now()) <= 2 * 1000) {
      log('token expireAt ' + expireAt + '过期' + (expireAt - Date.now()))
      return false
    }
    // log({
    //   vxGlobal_Token
    // })
    return true
  },
  handleCode({code, corpId, agentType, store}) {
    log('handleCode: ', code)
    return new Promise((resolve, reject) => {
      // log('enter promise')
      axios.post('wx/auth', {code, corpId, agentType})
        .then(res => {
          console.log(res)
          if (res.data.status == 0) {
            const authData = res.data.data

            // {"name": "string",
            //   "personId": "string",
            //   "phone": "string",
            //   "schoolId": "string",
            //   "token": {
            //     "expireAt": 0,
            //     "token": "string"
            // }

            const {expireAt, token} = authData.token
            // console.log('saveTokenData:', {token, expireAt, corpId, agentType})
            store.commit(types.MUTATIONS.setTokenData, {token, expireAt, corpId, agentType})

            store.commit(types.MUTATIONS.setAuthData, authData)
            store.commit(types.MUTATIONS.setAgentType, agentType)

            log('state:', store.state)
            resolve(authData)
          } else {
            reject()
            log('获取授权信息失败 ' + (res.data || {}).message)
          }
        }).catch(res => {
        reject()
        log('授权失败:', res)
      })
    })
  }
}

function log() {
  // console.log.apply(console, arguments)
  // document.title=arguments[0]
}

function alert() {
  console.warn('alert:', arguments)
  // $('body').append('<p>'+JSON.stringify(arguments)+'</p>')
  window.alert.apply(window, arguments)
}

function toastWarn(message) {
  alert(message)
}

const isDev = IS_ENV_DEV

/**
 * Simple is object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null)
}

/**
 * Deep merge two objects.
 * @param target
 * @param source
 */
export function mergeDeep(target, source) {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {[key]: {}})
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, {[key]: source[key]})
      }
    })
  }
  return target
}


export default class WxAuth {
  constructor(router, store, opts = {}) {
    const _this = this

    _this.opts = mergeDeep({}, OPTS_DEFAULTS, opts)
    _this.router = router
    _this.store = store
    _this.interceptorRouter()
    _this.fixedWxRedirectBackNotRefresh()

  }

  // 微信授权url重定向回到之前的页面时，由于location.history，不能触发vue router的钩子回调，这里加上钩子。
  fixedWxRedirectBackNotRefresh() {
    const _this = this

    window.onhashchange = function () {
      const route = parseRoute()
      const isWxCallback = _this.isRouteWxCallback(route)
      // log({
      //   route,
      //   isWxCallback
      // })
      if (isWxCallback) {
        log('isWxCallback and reload')
        _this.handlerWxCallBack(route)
        // alert('wxc hash')
      }
      log('hash change')
    }
  }

  // 处理路由已授权的情况
  handlerRouter(to, from, next) {

    const _this = this

    // log('beforeEach', {to, from, next})

    if (_this.isRouteNeedAuth(to, from)) {
      log('beforeEach', ' to:', to.path, ',from:', from.path)
      log('needAuth and checking')
      const corpId = _this.getCorpId(to)
      const agentType = _this.getAgentType(to)

      const hasAuth = _this.opts.isAuth({
        store: _this.store, corpId
      })

      if (hasAuth) {
        // 已经授权 直接进入路由
        this.store.commit(types.MUTATIONS.setAgentType, agentType)
        next()
        return
      } else {
        _this.handlerUnAuth(to, from, next)
      }

    } else {
      next()
      return
    }
  }

  // 处理路由没有且需要授权的情况
  handlerUnAuth(to, from, next) {
    const _this = this
    log('hasAuth', false)

    // 未授权 检查授权
    if (!_this.isWxEntry(to)) {
      // toastWarn('登录失败，缺少入口参数!')
      log('登录失败，缺少入口参数!')

      _this.router.replace({
        path: '/_error',
        query: {
          msg: '缺少授权参数'
        }
      })
    } else if (_this.isRouteWxCallback(to)) {
      // alert('wxc router')
      // _this.handlerWxCallBack(to)
    } else {
      log('beginAuth')
      _this.beginAuth(to)
    }
  }


  handlerWxCallBack(to) {
    log('微信授权回调')
    const _this = this

    const code = _this.getCode(to)
    log('code', code)

    const corpId = _this.getCorpId(to)
    const agentType = _this.getAgentType(to)

    _this.opts.handleCode({
      code, corpId, agentType, router: _this.router, store: _this.store
    }).then(res => {
      log('handleCode success')
      const {code, state, ...query} = to.query
      const {path, params} = to
      const route = {path, params, query}
      // _this.router.replace(route)
      // alert('handlerWxCallBack success')
      const {origin, pathname} = location
      const url = origin + pathname + _this.router.resolve(route).href
      location.replace(url)
      location.reload(true)
    }).catch(res => {
      log('catch：', res)
      _this.router.replace({
        path: '/_error',
        query: {
          msg: '微信登录授权失败'
        }
      })
    })
  }

  // 拦截路由
  interceptorRouter() {
    const _this = this
    _this.router.beforeEach((to, from, next) => _this.handlerRouter(to, from, next))
  }

  // 开始授权
  beginAuth(to, from) {
    // 存储 授权前的url

    this.goWeixinAuth(to)
  }

  // 去往微信授权
  goWeixinAuth(currentRoute) {
    log('goWeixinAuth', currentRoute)
    const {query = {}, path} = currentRoute
    delete query['code']
    delete query['state']
    const {origin, pathname} = location
    // const callbackRoute = {path: '/authing', query}
    const originalUrl = {path, query}
    //回传地址
    const vueurl =  pathname + this.router.resolve(originalUrl).href
    //返回系统根目录进行授权
    const encodedRedirectUrl = encodeURIComponent(origin+"/message")
    const corpId = this.getCorpId(currentRoute)
    const agentType = this.getAgentType(currentRoute)
    this.store.commit(types.MUTATIONS.setOriginalUrl, vueurl)
    this.store.commit(types.MUTATIONS.setCorpId, corpId)
    this.store.commit(types.MUTATIONS.setAgentType, agentType)
    window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corpId}&redirect_uri=${encodedRedirectUrl}&response_type=code&scope=SCOPE&state=STATE#wechat_redirect`)
    // this.router.push('/?code=poaXTATbzRaFesSADj47bM-rXJsajOIg1uws-jkyOOI&state=STATE')
  }

  // 检查当前路由是否需要授权
  isRouteNeedAuth(to, from) {
    const routes = [...to.matched].reverse()
    if (_.some(routes, route => (route.meta || {}).needAuth === false)) {
      console.log("need not auth")
      return false
    }
    let needAuth = false
    const found = _.some(routes, route => {
      const _needAuth = (route.meta || {}).needAuth
      if (_needAuth === true || _needAuth === false) {
        needAuth = _needAuth
        return true
      }
      return false
    });
    return found && needAuth
  }

  // 检查是否是微信回调
  isRouteWxCallback(route) {// 检查是否是微信回调
    return this.isWxEntry(route) && !!this.getCode(route)
  }

  isWxEntry(route) {// 检查是否是微信入口
    return !!this.getCorpId(route) && !!this.getAgentType(route)
  }

  getCorpId(route) {
    return route.query['_corpId']
  }

  getAgentType(route) {
    return route.query['_agentType'] || 'SPOC'
  }

  getCode(route) {
    return route.query['code']
  }

}
