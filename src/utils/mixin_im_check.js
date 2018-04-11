/**
 * 检查输入法状态
 */
export default {
  data() {
    return {
      imActive: null,// 输入法活动状态
    }
  },
  beforeCreate() {
    const vm = this
    const initClientHeight = document.body.clientHeight
    vm.$$(window).resize(() => {
      vm.imActive = document.body.clientHeight < initClientHeight
      console.log(document.body.clientHeight, initClientHeight)
    })
  },
}
