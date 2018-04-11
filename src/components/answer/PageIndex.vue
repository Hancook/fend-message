<template>
  <div class="sp_page sp_page_scroll bdBg" style="padding-bottom: 50px;">
    <answer :paper="filteredPaper" :posted="posted" v-if="posted!==null&&filteredPaper!==null"></answer>
    <loading-toast v-model="loading"></loading-toast>
  </div>
</template>

<script>
  import {STORE__ANSWER} from "../../utils/constants"
  import storeAnswer from './store'
  import {catchAxiosError} from "../../utils/common";
  import {Toast} from 'mint-ui'
  import {toWarnPage} from "../../utils/vm_methods_common";

  export default {
    name: 'AnswerPageIndex',
    data() {
      return {
        fetchingPaper: null,
        paper: null,
        posted: null,
        answerId: null,
        filteredPaper: null,
        fetchingPosted: null,
        qIds: null,
      }
    },
    methods: {
      toWarnPage,
      // 获取问卷数据
      fetchPaper(complete) {
        const vm = this
        const params = {}
        vm.fetchingPaper = true
        const baseURL = location.origin + location.pathname
        vm.$axios.get(`static/answer/${vm.answerId}.json`, {params, baseURL}).then(res => {
          vm.paper = res.data
          vm.filterPaper()
          vm.fetchingPaper = false
          complete && complete(true)
        }).catch(res => {
          console.log(res)
          complete && complete(false)
          vm.fetchingPaper = false
          vm.toWarnPage({msg: '内容不存在或者已删除'})
        })
      },
      // 获取问卷id参数
      getAnswerId() {
        const vm = this
        const route = vm.$route
        const query = route.query
        const params = route.params
        return query['id'] || query['answerId'] || params['id'] || params['answerId']
      },
      // 获取qIds参数，用于过滤要显示的问题，为空默认显示所有题目 [1,2,3]
      getQIds() {
        const vm = this
        const {query, params} = vm.$route
        let qIds = query['qIds'] || params['qIds']
        if (qIds === undefined || qIds === null) {
          return []
        }

        if (_.isString(qIds)) {
          qIds = qIds.split(',').map(q => q.trim()).filter(_.identity)
        }
        if (!_.isArray(qIds)) {
          console.error('qIds:无法解析成数组', qIds)
          return []
        }
        return qIds.filter(_.identity).map(q => parseInt(q))
      },
      filterPaper() {
        const vm = this
        const filteredQs = vm.filterQuestions(vm.paper['questions'])
        if (_.isEmpty(filteredQs)) {
          vm.toWarnPage({msg: '问卷为空'})
        }
        vm.filteredPaper = {...vm.paper, questions: filteredQs}
      },
      filterQuestions(questions) {
        const vm = this
        let filteredQs = questions
        if (!_.isEmpty(vm.qIds)) {
          filteredQs = questions.filter(q => vm.qIds.indexOf(parseInt(q.id)) != -1)
        }
        return filteredQs
      },
      // 获取提交记录
      fetchPosted(complete) {
        const vm = this
        const params = {
          'qIds': vm.qIds.join(','),
          'qids': vm.qIds.join(',')
        }
        vm.fetchingPosted = true
        vm.$axios.get(`survey/${vm.answerId}`, {params}).then(res => {
          const success = res.data.status == 0;
          if (!success) {
            Toast('获取提交数据失败 ' + (res.data.status || ''))
          } else {
            vm.handlerPostedData(res.data.data)
          }
          complete && complete(success, res.data.data)
          vm.fetchingPosted = false
        }).catch(res => {
          console.log(res)
          complete && complete(false, null)
          vm.fetchingPosted = false
          catchAxiosError(res, vm, '获取问卷提交信息失败')
        })
      },
      handlerPostedData(data) {
        const vm = this
        if (!data) {
          vm.posted = {}
        } else {
          if (_.isArray(data)) {
            vm.posted = data.reduce((aa, a) => {
              aa[parseInt(a['questionId'])] = {...a, answers: a['answer'].split(',')}
              return aa
            }, {})
          } else {
            console.log('获取问卷提交信息数据有误')
          }
        }
      },
    },
    computed: {
      loading() {
        return this.fetchingPaper || this.fetchingPosted
      },
    },
    created() {
      const vm = this
      vm.answerId = vm.getAnswerId()
      vm.qIds = vm.getQIds()
      vm.fetchPosted((success) => {
        if (success) {
          // vm.toWarnPage({title: '问卷已提交', msg: '感谢您的配合'})
        } else {
        }
      })
      vm.fetchPaper(success => {
      })
    },
    beforeCreate() {
      const vm = this
      vm.$store.registerModule(STORE__ANSWER, storeAnswer())
    },
    destroyed() {
      const vm = this
      vm.$store.unregisterModule(STORE__ANSWER)
    },
    components: {
      Answer: require('./Answer.vue')
    },
  }
</script>

<style>
</style>
