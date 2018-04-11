<template>
  <transition name="fade"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut">
    <div class="js_dialog" v-show="show">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">弹窗标题</strong></div>
        <div class="weui-dialog__bd">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">辅助操作</a>
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">主操作</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'WDialog',
    data() {
      return {
        show: false,
      }
    },
    methods: {},
    computed: {},
    created() {
      const vm = this
    },
  }
</script>

<style>
  .fade-enter-active {

  }
  .bounce-leave-active {
  }
</style>
