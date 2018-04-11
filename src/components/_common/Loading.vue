<template>
  <p class="page-infinite-loading">
    <mt-spinner type="fading-circle" :size="30" color="#00c3a3"></mt-spinner>
    <br>加载中...
  </p>
</template>
<style lang="scss" type="text/scss">
  .page-infinite-loading {
    display: block;
    padding: 20px 0;
    text-align: center;
    span {
      padding-bottom: 20px;
      display: inline-block;
    }
  }
</style>

<script>
  import Vue from 'vue'
  import {Spinner} from 'mint-ui'

  Vue.component(Spinner.name, Spinner)
  export default {
    name: 'loading',
  }
</script>
