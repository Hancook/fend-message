<template>
  <div class="spm_wrap_dev">
    <p v-if="!IS_ENV_DEV" style="text-align: center;color: #999;padding: 10px;">师大云课堂</p>
    <div v-if="IS_ENV_DEV">


      <div class="weui-cells__title">api:</div>

      <div class="weui-cell">
        <api-selector></api-selector>
      </div>

      <div class="weui-cells__title">应用:</div>

      <div class="weui-cell weui-cell_select">
        <div class="weui-cell__bd">
          <select class="weui-select" name="agentType" v-model="agentType">
            <option
              v-for="agent in AGENT_TYPE_LIST" :value="agent.value"
              :title="agent.value" v-text="agent.name">
            </option>
          </select>
        </div>
      </div>

      <div class="weui-cells__title">登录账户（点击选择）</div>
      <div class="weui-cells">
        <select class="weui-select" name="testUserId" v-model="testUserId">
          <option
            v-for="user in TEST_USERS" :value="user.userId"
            :title="user.userId" v-text="user.name">
          </option>
        </select>
      </div>

      <div class="weui-cells__title">登录类型</div>

      <div class="weui-cells">
        <select class="weui-select" name="authWeixin" v-model="authWeixin">
          <option :value="true">微信登录</option>
          <option :value="false">模拟登录</option>
        </select>
      </div>

      <div class="weui-cells__title">登录入口</div>

      <div class="weui-cells">
        <a class="weui-cell weui-cell_access" href="javascript:;"
           v-for="item in AUTH_ENTRIES" @click="goAuthEntry(item)">
          <div class="weui-cell__bd">
            <p>{{item.name}}</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </a>
      </div>


      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__hd">其他</div>

        <div class="weui-panel__bd">

          <div class="weui-media-box weui-media-box_text" v-for="item in URLS">
            <a :href="item.href" :title="item.href">
              <h4 class="weui-media-box__title">{{item.name}}</h4>
            </a>
            <p class="weui-media-box__desc">{{item.href}}</p>
          </div>

        </div>
      </div>

    </div>

    <loading-toast v-model="loading"/>

  </div>
</template>
<script>
  import Vue from 'vue'
  import {mapGetters} from 'vuex'
  import {catchAxiosError, getRouteQuery, getStorageDataAndDecode, setStorageDataAndEncode} from '../utils/common'
  import entry from '../utils/entry'
  import types from '../store/global/types'
  import global_types from '../store/global/types'
  import * as common from '../utils/common'
  import {IS_ENV_DEV, ENV_CONFIG, STRING_APP_NAME} from '../utils/constants'
  import {Toast} from 'mint-ui'

  // 应用列表
  const AGENT_TYPE_LIST = [
    {
      name: 'SPOC',
      value: 'SPOC',
    }
  ]

  // 测试账户
  const TEST_USERS = [
    {
      name: '王豪',
      userId: '0333aba5a87f4531870caa2a38046797',
    },
    {
      name: '阮笛沛',
      userId: '5750b23a-4e4f-4ab4-be00-ddf8784f2fd8',
    },
    {
      name: '程晓龙',
      userId: '320f44031a60437caabe19cf93315e78',
    },
    {
      name: '任文园',
      userId: '85cd6a722e21420494ef46827077a60f',
    },
  ]

  const TEST_CORP_ID_tlyj = 'wxf49dc237afa152f7'; // 童乐幼教
  const TEST_CORP_ID = TEST_CORP_ID_tlyj

  let COURSE_ID = 'f7d247b793aa11e78441000c2974f54a', ANSWER_ID = '123', TOPIC_ID = '393135508e1211e7a9bc005056b233c9'
  const entryPath = '/main/jssdk_test' // jssdk_test

  var URLS = [
    {
      name: '路由表',
      href: '#/route',
      target: '_self'
    },
  ]

  var AUTH_ENTRIES = [
    {
      name: '签到',
      path: '/main/sign',
      query: {
//        siteId: COURSE_ID,
//        topicId: TOPIC_ID,
//        answerId: ANSWER_ID,
      }
    },
    {
      name: '问卷调查',
      path: '/main/answer',
      query: {
//        siteId: COURSE_ID,
//        topicId: TOPIC_ID,
//        answerId: ANSWER_ID,
      }
    },
    {
      name: '学习交流',
      path: '/main/seminar',
      query: {
//        siteId: COURSE_ID,
//        topicId: TOPIC_ID,
//        answerId: ANSWER_ID,
      }
    },
    {
      name: '消息',
      path: '/main/message',
      query: {
//        siteId: COURSE_ID,
//        topicId: TOPIC_ID,
//        answerId: ANSWER_ID,
      }
    },
//    {
//      name: '课程',
//      path: '/main/course',
//      query: {
//        siteId: COURSE_ID,
//        topicId: TOPIC_ID,
//        answerId: ANSWER_ID,
//      }
//    },
    {
      name: '课程查看',
      path: '/main/course_list',
      query: {
//        siteId: COURSE_ID,
//        topicId: TOPIC_ID,
//        answerId: ANSWER_ID,
      }
    },
    {
      name: 'jssdk_test',
      path: '/main/jssdk_test',
      query: {
//        siteId: COURSE_ID,
//        topicId: TOPIC_ID,
//        answerId: ANSWER_ID,
      }
    },
  ]

  export default {
    name: 'DevLogin',
    title() {
      return IS_ENV_DEV ? '开发登录测试' : STRING_APP_NAME
    },
    data() {
      const vm = this
      Object.assign(vm, {
        AGENT_TYPE_LIST,
        TEST_USERS,
        IS_ENV_DEV,
        URLS,
        AUTH_ENTRIES,
      })
      return {
        agentType: vm.vxGlobal_agentType,
        testUserId: '',
        corpId: '',
        wxAuthing: false,
        testUserId: TEST_USERS[0].userId,
        authing: null,
        authWeixin: localStorage.getItem('authWeixin') === 'true',
      }
    },
    created() {
      const vm = this
      vm.checkAuth()
    },
    methods: {
      //检查登录状态
      checkAuth() {
        const vm = this
        // 检查corpId
        const corpId = vm.getCorpId()
        if (!corpId) {
//          vm.$vux.toast.show({
//            text: 'corpId为空，无法登录',
//            type: 'warn'
//          })
          return
        }
        vm.corpId = corpId
        // 检查agentType
        vm.agentType = vm.getAgentType()
        if (!vm.agentType) {
          vm.$alert({
            text: 'agentType为空，无法登录',
            type: 'warn'
          })
          return
        }
      },
      getAllQuery() {
        const vm = this
        return {
          _agentType: vm.agentType,
          _corpId: vm.corpId
        }
      },

      goEntryRoute(entry){
        const vm = this
        const route = {
          path: entry.path,
          query: {
            ...vm.getAllQuery(),
            ...(entry.query || {}),
          },
          params: entry.params || {}
        }
        vm.$router.push(route)
      },
      goAuthEntry(entry) {
//        item:{
//          name: '路由表',
//          path: '/route',
//          query:{},
//          params:{}
//        },
        const vm = this

        // console.log('goAuthEntry:', JSON.stringify(entry))
        if (!vm.authWeixin) {
          vm.selectTestUserId(vm.testUserId, success => {
            if (success) {
              vm.goEntryRoute(entry)
            } else {
              Toast('登录失败')
            }
          })
        } else {
          vm.goEntryRoute(entry)
        }
      },
      storeAgentType() {
        const vm = this
        vm.$store.commit(types.MUTATIONS.setAgentType, vm.agentType)
      },
      getCorpId() {
        let corpId = getRouteQuery()['_corpId']
        if (!corpId && IS_ENV_DEV) {
          return TEST_CORP_ID // 开发环境默认使用 starclink 测试企业微信
        }
        return corpId
      },
      getAgentType() {
        let agentType = getRouteQuery()['_agentType']
        if (!agentType && IS_ENV_DEV) {
          return AGENT_TYPE_LIST[0].value
        }
        return agentType
      },
      // 存储 token 授权数据
      storeAuthData(authData) {
        const vm = this
        // {"name": "string",
        //   "userId": "string",
        //   "phone": "string",
        //   "schoolId": "string",
        //   "token": {
        //     "expireAt": 0,
        //     "token": "string"
        // }
        const {expireAt, token} = authData.token
        vm.$store.commit(types.MUTATIONS.setTokenData, {
          token,
          expireAt,
          corpId: vm.corpId,
          agentType: vm.agentType
        })
        vm.$store.commit(types.MUTATIONS.setAuthData, authData)
        vm.$store.commit(types.MUTATIONS.setAgentType, vm.agentType)
      },
      selectTestUserId(userId, complete) {
        const vm = this
        vm.testUserId = userId
        vm.$store.commit(types.MUTATIONS.resetSession)
        vm.authing = true
        vm.$axios.post('wx/auth_dev', {userId: vm.testUserId, corpId: vm.corpId})
          .then(res => {
            const success = res.data.status == 0;
            if (success) {
              const authData = res.data.data
              vm.storeAuthData(authData)
            }
            complete && complete(success)
            vm.authing = false
          }).catch(res => {
          vm.authing = false
          complete && complete(false)
          catchAxiosError(res, vm)
        })
      },
    },
    watch: {
      agentType() {
        this.storeAgentType()
      },
      $route: {
        handler() {
          this.wxAuthing = false
          this.checkAuth()
        },
        deep: true
      },
      authWeixin(aw){
        localStorage.setItem('authWeixin', aw)
      },
    },
    computed: {
      ...mapGetters({
        vxGlobal_corpId: types.GETTERS.corpId,
        vxGlobal_token: types.GETTERS.token,
        vxGlobal_isLogged: types.GETTERS.isLogged,
        vxGlobal_loginData: types.GETTERS.loginData,
        vxGlobal_agentType: types.GETTERS.agentType,
      }),
      loading() {
        return this.authing
      },
    },
    components: {
      ApiSelector: require('./_common/ApiSelector.vue')
    },
  }
</script>
<style scoped lang="less" type="text/less">
</style>
