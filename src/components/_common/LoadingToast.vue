<template>
  <div v-if="show===true">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class="weui-loading weui-icon_toast"></i>
      <p class="weui-toast__content" v-text="msg"></p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoadingToast',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      msg: {
        type: String,
        default: '正在加载'
      }
    },
    data() {
      return {
        show: null,
      }
    },
    methods: {
      debounceShow: _.debounce(function () {
        this.show = this.value
      }, 500)
    },
    computed: {},
    created() {
      const vm = this
    },
    mounted() {
      const vm = this
      vm.debounceShow()
    },
    watch: {
      value(value) {
        if (value === true) {
          this.debounceShow()
        } else {
          this.show = value
        }
      }
    },
  }
</script>

<style>
</style>
