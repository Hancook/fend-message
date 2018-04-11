export default {
  props: {
    question: {
      type: Object,
      require: true,
    },
    qIndex: {
      type: Number,
      require: true,
    },
    qAnswer: {
      require: true,
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    canPost: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      answer: null,
      answers: [],
    }
  },
  created() {
    const vm = this
    vm.initAnswers()
    vm.watchAnswers()
  },
  methods: {
    postAnswerChange(answers) {
      const vm = this
      vm.$emit('answers', answers)
    },
    watchAnswers() {
      const vm = this
      vm.$watch('answer', () => {
        let answer = this.answer
        if (this.filterAnswer) {
          answer = this.filterAnswer(answer)
        }
        this.postAnswerChange(_.isEmpty(answer) ? [] : [answer])
      })
      vm.$watch('answers', () => {
        let answers = this.answers
        if (this.filterAnswers) {
          answers = this.filterAnswers(answers)
        }
        this.postAnswerChange([...answers])
      })
    },
  },
  watch: {},
  computed: {
    choices() {
      return this.question.choices
    },
  },
}
