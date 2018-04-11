export default {
  props: {
    pageData: {
      type: Object,
      default() {
        return {}
      },
    }
  },
  data() {
    return {
      title: '',
      msg: '',
    }
  },
  created() {
    let vm = this
    vm.title = vm.getParam('title') || vm.dTitle || '操作成功'
    vm.msg = vm.getParam('msg') || vm.dMsg || ''
  },
  methods: {
    getParam(name) {
      const vm = this
      const {query, params} = vm.$route
      return params[name] || query[name] || vm.pageData[name]
    }
  }
}
