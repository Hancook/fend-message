<template>

  <div class="weui-cells weui-cell-list">

    <div class="weui-cells_title">
      <h5>
        <template v-if="showIndex"><span v-text="qIndex+1"></span>.</template>
        <!--<span v-if="typeName">（{{typeName}}） </span>-->
        <span v-text="question.content"></span>
        <!--<small class="weui-cell_warn" v-if="question.require">*</small>-->
      </h5>
    </div>

    <div class="weui-cell weui-cells_checkbox" v-for="(choice,index) in choices">
      <label class="weui-cell weui-check__label">
        <div class="weui-cell__hd">
          <input type="checkbox" class="weui-check" name="qChoice" :disabled="!canPost"
                 v-if="question.type=='1'" :value="choice.id"
                 v-model="answers">
          <input type="radio" class="weui-check" name="qChoice" :disabled="!canPost" v-if="question.type=='2'"
                 :value="choice.id"
                 v-model="answer">
          <i class="weui-icon-checked"></i>
        </div>
        <div class="weui-cell__hd weui-cell_primary">
          <p>{{getOptionBySort(index+1)}} . {{choice.content}}</p>
        </div>
      </label>
    </div>

  </div>

</template>

<script>
  import qMixin from './question_mixin'
  import {TYPE_NAMES} from "../utils";
  import {getOptionBySort} from "../../../utils/common";


  export default {
    name: 'QChoice',

    data() {
      return {}
    },
    methods: {
      getOptionBySort,
      initAnswers() {
//        console.log('init Answers')
        const vm = this
        const answers = (vm.qAnswer || {})['answers'] || [];
        vm.answer = answers[0]
        vm.answers = answers
      },
    },
    computed: {
      typeName() {
        return TYPE_NAMES[this.question['type']]
      },
    },
    mixins: [qMixin],
    created() {
      const vm = this
//      console.log(this.$options.name, 'created')
    },
  }
</script>

<style>
</style>
