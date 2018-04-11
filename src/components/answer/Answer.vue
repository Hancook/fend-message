<template>
  <div class="compo_answer">


    <template>

      <div class="page-head" v-if="!isSingleQues">
        <span style="display:inline-block;text-indent: 2em;">{{curDescription}} <span style="color: #555;">（全部 {{questions.length}} 道题）</span></span>
        <!--<span class="weui-cell_warn">*</span> 为必答题-->
      </div>

      <div class="page-head" v-if="isSingleQues">
        <span style="display:inline-block;text-indent:2em;">{{curDescription}}</span>
      </div>

      <div class="progress-box" v-if="!isSingleQues">
        <div class="weui-progress">
          <div class="weui-progress__bar">
            <div class="weui-progress__inner-bar" :style="{'width': qProgressPercent+'%'}"></div>
          </div>
        </div>
      </div>

    </template>

    <component
      v-if="curQuestionCompo"
      :show-index="!isSingleQues"
      :is="curQuestionCompo"
      :question="curQuestion"
      :q-index="curQuestionIndex"
      :q-answer="curAnswer"
      :can-post="curCanPost"
      @answers="onAnswer"/>

    <div class="weui-btn-area weui-btn-box weui-footer_fixed-bottom" v-show="!hideBottomBtn">
      <div class="weui-flex">

        <div class="weui-flex__item" v-if="!isSingleQues">
          <a
            href="javascript:" class="weui-btn weui-btn_default"
            :class="{'weui-btn_disabled':!canPrevious}" @click="previous">上一题</a>
        </div>


        <div class="weui-flex__item" v-show="isLast">
          <a href="javascript:" class="weui-btn weui-btn_primary" :class="{'weui-btn_disabled':!finished||isAllPosted}"
             @click="clickSubmit">{{isAllPosted?'已提交':'提交'}}</a>
        </div>

        <div class="weui-flex__item" v-show="!isLast" v-if="!isSingleQues">
          <a href="javascript:" class="weui-btn weui-btn_primary" :class="{'weui-btn_disabled':!canNext}" @click="next">下一题</a>
        </div>

      </div>
    </div>

    <loading-toast v-model="loading"></loading-toast>

    <!--<w-dialog></w-dialog>-->

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import types from './store/types'
  import {catchAxiosError, cloneData} from "../../utils/common"
  import {MessageBox, Toast} from 'mint-ui'
  import {toMsgPage, toWarnPage} from "../../utils/vm_methods_common"
  import mixin_im_check from '../../utils/mixin_im_check'

  const QUESTION_COMPOS = {
    '1': require('./question/QChoice.vue'),
    '2': require('./question/QChoice.vue'),
    '3': require('./question/QText.vue'),
  }

  const COMPONENTS = _.reduce(QUESTION_COMPOS, (compos, compo) => {
    compos[compo.name] = compo
    return compos
  }, {})

  export default {
    name: 'Answer',
    props: {
      paper: { // {name:'',questions:[{id,content}]}
        require: true,
        type: Object,
        validator(paper) {
          const requireProperies = ['name', 'questions', 'description']
          const ok = _.every(requireProperies, p => _.hasIn(paper, p))
          if (!ok) {
            console.error('缺失字段', _.filter(requireProperies, p => !_.hasIn(paper, p)).join(','))
          }
          return ok
        },
      },
      posted: {// {1:{answers:['A','B','C','D'],createTime:111}}
        type: Object,
        default: {}
      },
    },
    data() {
      return {
        answerId: '',// 问卷id
        curQuestionIndex: 0,
        curQuestionCompo: '',
        posting: null,
      }
    },
    methods: {
      toMsgPage, toWarnPage,
      clickSubmit() {
        const vm = this
        if (!vm.finished || vm.isAllPosted) {
          return
        }
        MessageBox.confirm('确认提交?').then(action => {
          vm.posting = true
          vm.postAnswer(success => {
            vm.posting = false
          })
        }).catch(error => {
        })

      },
      postAnswer(complete) {
        const vm = this
        const params = {
          "answers": vm.getPostAnswers(),
          "siteId": vm.answerId,
//          "qIds": vm.qIds,
//          "stduentNo": "string"
        }
        vm.$axios.post('survey', params).then(res => {
          const success = res.data.status == 0
          if (success) {
            vm.toMsgPage({title: '提交成功', msg: '感谢您的配合'}, true)
          } else {
            Toast('提交失败 ' + (res.data.message || ''))
          }
          complete && complete(success)
        }).catch(res => {
          complete && complete(false)
          catchAxiosError(res, vm)
        })
      },
      getPostAnswers() {
        return _.map(this.vxAnswer_answers, (answer, questionId) => ({
          questionId: parseInt(questionId),
          answer: (answer['answers'] || []).join(',')
        }))
      },
      getAnswerId() {
        const vm = this
        const route = vm.$route
        const query = route.query
        const params = route.params
        return query['id'] || query['answerId'] || params['id'] || params['answerId']
      },
      judgeQuestionCompo() {
        const vm = this
        const qId = (vm.curQuestion || {}).type
        vm.curQuestionCompo = qId ? QUESTION_COMPOS[qId].name : ''
      },
      //选择下一题
      next() {
        const vm = this
        if (vm.canNext) {
          vm.curQuestionIndex++
        }
      },
      //选择上一题
      previous() {
        const vm = this
        if (vm.canPrevious) {
          vm.curQuestionIndex--
        }
      },
      onAnswer(answer) {
        const vm = this
        vm.$store.commit(types.mutations.setAnswer, {
          qId: vm.curQuestion.id,
          answer: cloneData(answer)
        })
      },
      // 初始化已经提交的问题
      initPosted() {
        const vm = this
        const vxPosted =
          _.reduce((vm.posted || {}), (dd, data, qId) => {
            dd[parseInt(qId)] = {
              answers: data['answers'],
              posted: true
            }
            return dd
          }, {})
        vm.$store.commit(types.mutations.setPostedAnswers, cloneData(vxPosted))
      },
    },
    computed: {
      curDescription() {
//        return this.curQuestion['title']
        return this.paper['description']
      },
      questions() {
        return this.paper.questions
      },
      curQuestion() {
        return this.questions[this.curQuestionIndex]
      },
      canNext() {
        const indexValid = this.curQuestionIndex < this.questions.length - 1
        return indexValid && this.qAnswered
      },
      // 当前题目已答
      qAnswered() {
        return !_.isEmpty(this.curAnswer) && !_.isEmpty(this.curAnswer['answers'])
      },
      canPrevious() {
        return this.curQuestionIndex > 0
      },
      qProgressPercent() {
        if (_.isEmpty(this.questions)) {
          return 0
        }
        return parseInt(((this.curQuestionIndex + 1) / this.questions.length) * 100)
      },
      ...mapGetters({
        vxAnswer_answers: types.getters.answers
      }),
      curAnswer() {
        if (this.curQuestion) {
          return this.vxAnswer_answers[this.curQuestion.id]
        }
        return null
      },
      curCanPost() {
        return !this.curAnswer || !this.curAnswer.posted
      },
      finished() {
        const vm = this
        const answers = _.values(vm.vxAnswer_answers || {})
        const doLen = answers.length
        return doLen > 0 && doLen == vm.questions.length && _.every(answers, a => !_.isEmpty(a) && !_.isEmpty(a['answers']))
      },
      isLast() {
        return this.curQuestionIndex >= 0 && this.curQuestionIndex == this.qLen - 1
      },
      qLen() {
        return (this.questions || []).length
      },
      hideBottomBtn() {
        return this.imActive === true
      },
      isSingleQues() {
        return this.questions.length === 1
      },
      qIds() {
        return this.questions.map(q => q.id).join(',')
      },
      loading() {
        return this.posting || this.checking
      },
      isAllPosted() {
        const vm = this
        return _.every((vm.questions || []), q => (vm.vxAnswer_answers[q.id] || {}).posted === true)
      },
    },
    created() {
      const vm = this
      vm.answerId = vm.getAnswerId()
      vm.initPosted()
      vm.judgeQuestionCompo()
    },
    watch: {
      curQuestionIndex() {
        const vm = this
        vm.curQuestionCompo = ''
        vm.$nextTick(() => vm.judgeQuestionCompo())
      }
    },
    mixins: [mixin_im_check],
    components: {
      ...COMPONENTS
    }
  }
</script>

<style scope>
  .weui-progress__inner-bar {
    transition: width 0.2s ease;
  }
</style>
