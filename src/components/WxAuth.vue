<template>
  <div>
    <div v-loading="loadStatus.isLoading" style="height: 100px;">
      <p class="wx_isLoading">正在登陆。。。</p></div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {parseQuery, parseRoute} from "../utils/common";
  import types from "../store/global/types"
  import * as axios from 'axios'
  //
  export default {
    name: 'WxAuth',
    data() {
      return {
        loadStatus: {
          isLoading: true
        },
        msg: ''
      }
    },
    methods: {
      getCode(route) {
        return route.query['code']
      },
//
      handlerWxCallBack(to, redirect) {
        const vm = this
        console.log('微信授权回调')
        const code = vm.getCodeByHref()
        console.log('code', code)

        const corpId = vm.corpId
        const agentType = vm.agentType
        console.log('redirect', redirect)
        vm.handleCode({
          code, corpId, agentType
        }).then(res => {
          //解决加上#号无法识别的问题
          vm.$router.replace(redirect.replace("message/#/", ""))
//          window.reload(true)
        }).catch(res => {
          console.log('catch：', res)
          vm.$router.replace({
            path: '/_error',
            query: {
              msg: '微信登录授权失败'
            }
          })
        })
      },
      handleCode({code, corpId, agentType}) {
        const vm = this
        console.log('handleCode: ', code)
        return new Promise((resolve, reject) => {

          axios.post('wx/auth', {code, corpId, agentType})
            .then(res => {
              if (res.data.status == 0) {
                const authData = res.data.data
                const {expireAt, token} = authData.token
                // console.log('saveTokenData:', {token, expireAt, corpId, agentType})
                vm.$store.commit(types.MUTATIONS.setTokenData, {token, expireAt, corpId, agentType})
                vm.$store.commit(types.MUTATIONS.setAuthData, authData)
                vm.$store.commit(types.MUTATIONS.setAgentType, agentType)
                resolve(authData)
              } else {
                reject()
                console.log('获取授权信息失败 ' + (res.data || {}).message)
              }
            }).catch(res => {
            reject()
            console.log('授权失败:', res)
          })
        })
      },
      getCodeByHref() {
        let codeHref = window.location.href.match(/(code=).*(?=\&)/g)
        return codeHref ? codeHref[0].replace("code=", "") : ""
      }
    },
    created() {
      const vm = this
      const toUrl = vm.session.originalUrl;
      const route = parseRoute();
      vm.handlerWxCallBack(route, toUrl)

    },
    computed: {
      ...mapGetters({
        session: types.GETTERS.session,
        corpId: types.GETTERS.corpId,
        agentType: types.GETTERS.agentType,
      }),
    },
    components: {}
  }
</script>

