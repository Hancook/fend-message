<template>
  <div class="weui-cells weui-cell-list compo_qtext">

    <div class="weui-cells_title">
      <h5>
        <template v-if="showIndex"><span v-text="qIndex+1">1</span>.</template>
        <span v-text="question.content"></span>
        <!--<small class="weui-cell_warn" v-if="question.require">*</small>-->
      </h5>
    </div>

    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea id="textarea" class="weui-textarea" placeholder="请输入文本" rows="5" :maxlength="contentMax"
                    v-model="answer"></textarea>
          <div class="weui_textarea_counter"><span v-text="answerLen">0</span>/<span v-text="contentMax">100</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import qMixin from './question_mixin'

  export default {
    name: 'QText',
    data() {
      return {
        contentMax: 200
      }
    },
    methods: {
      initAnswers() {
//        console.log('init Answers')
        const vm = this
        vm.answer = (vm.qAnswer['answers'] || [])[0]
      },
      filterAnswer(answer) {
        const vm = this
        if ((typeof answer) === 'string') {
          return answer.trim()
        }
        return answer
      },
    },
    computed: {},
    mixins: [qMixin],
    created() {
      const vm = this
//      console.log(this.$options.name, 'created')
    },
    computed: {
      answerLen() {
        return (this.answer || '').length
      }
    },
  }
</script>

<style scoped>
  .weui_textarea_counter {
    color: #969696;
    font-size: 13px;
  }
</style>
