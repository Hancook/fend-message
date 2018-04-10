// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' // vuex store instance
// import 'mint-ui/lib/style.css'
import '../static/style/mint-ui/style.css'

// window._ = require('lodash')
Vue.config.productionTip = false

import {appInitInject, registerFilters, watchAndSetRouteTitle} from './utils/common'

appInitInject(store, router)
import WxAuth from "./utils/wx_auth_handler";

registerFilters()
watchAndSetRouteTitle(router)

import _common from './components/_common'

_common(router, store)

import _page from './components/_page'

_page(router, store)

import Vuetify from 'vuetify'

Vue.use(Vuetify)

import 'vuetify/dist/vuetify.css'

new WxAuth(router, store)

/* eslint-disable no-new */

window.Vue = Vue
window.router = router
window.store = store
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
