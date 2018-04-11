/**
 * Created by hao.wang on 2017/3/27.
 */
import types from '../store/global/types'

/**
 * 登出
 */
export const common_loginOut = function () {
  let vm = this
  vm.$store.dispatch(types.ACTIONS.loginOut)
}

/**
 * 根据角色判断进入不通主页路由
 */
export const common_judgeRoleRoute = function () {
  let vm = this
  // 根据角色不同，跳转对应路由主页
  if (vm.$route.path == '/') {
    let rolePath = ''

    if (vm.$store.getters[types.GETTERS.ROLE_IS.teacher]) {
      rolePath = 'teacher'
    } else if (vm.$store.getters[types.GETTERS.ROLE_IS.student]) {
      rolePath = 'student'
    } else if (vm.$store.getters[types.GETTERS.ROLE_IS.guardian]) {
      vm.$message({
        message: '暂不支持家长访问',
        type: 'warning'
      })
      rolePath = '404'
    } else {
      // 未登录，去往主页登录
      location.href = '/'
    }
    vm.$router.replace({path: '/' + rolePath})
  }

}


/**
 * 获取route对象对应的 full_path
 * @param route
 * @return {string}
 */
export const common_getRouteHref = function (route) {
  return this.$router.resolve(route).href
}

/**
 * 去往提示页面
 * @param vm vue实例
 * @param page 页面名称 约定 '_'+page 为路由，'page-'+page 为页面名称（name）
 * @param title 页面标题
 * @param msg
 * @param replace
 * @param cover
 */
function toPage(vm, page, data, replace = true, cover = true) {
  if (cover) {
    vm.$store.commit(types.MUTATIONS.setCoverPage, {
      page: 'page-' + page,
      data,
    })
  } else {
    vm.$router[replace ? 'replace' : 'push']({path: '_' + page, params: data, query: data})
  }
}

export const toMsgPage = function ({title, msg}, replace = true, cover = true) {
  toPage(this, 'msg', {title, msg}, replace, cover)
}

export const toErrorPage = function ({title, msg}, replace = true, cover = true) {
  toPage(this, 'error', {title, msg}, replace, cover)
}


export const toWarnPage = function ({title, msg}, replace = true, cover = true) {
  toPage(this, 'warn', {title, msg}, replace, cover)
}

/**
 * 通知mathjax重新渲染
 */
export const common_refreshMathjax = function (selector) {
  let vm = this

  // IS_ENV_DEV && console.log('refreshMathjax', vm.$el)
  if ('MathJax' in window) {
    let $el = selector ? vm.$$el.find(selector)[0] : vm.$el
    MathJax.Hub.Config({
      extensions: ['tex2jax.js'],
      jax: ['input/TeX', 'output/PreviewHTML'],
      tex2jax: {
        inlineMath: [['\\[', '\\]']],
        displayMath: [['\\(', '\\)']],
        processEscapes: false
      },
      'HTML-CSS': {availableFonts: ['TeX']}
    })
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, $el, function () {
      // console.log('refresh callback')
      $(vm.$el).removeAttr('mathjax-content').find('[mathjax-content]').removeAttr('mathjax-content')
      // console.log('refreshed')
    }])   // 通知mathjax重新渲染
  } else {
    console.error('common_refreshMathjax:MathJax 未初始化')
    $('[mathjax-content]').removeAttr('mathjax-content')
  }
}
