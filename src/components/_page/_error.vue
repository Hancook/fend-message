<template>

  <div class="sp_page sp_page_scroll sp_page_page">
    <div class="weui-msg">

      <div class="weui-msg__icon-area"><i class="weui-icon-warn weui-icon_msg"></i></div>

      <div class="weui-msg__text-area">
        <h2 class="weui-msg__title" v-text="title"></h2>
        <p class="weui-msg__desc" v-html="msg"></p>
      </div>

      <div class="weui-msg__opr-area" v-show="false">
        <p class="weui-btn-area">
          <a href="javascript:history.back();" class="weui-btn weui-btn_primary">推荐操作</a>
          <a href="javascript:history.back();" class="weui-btn weui-btn_default">辅助操作</a>
        </p>
      </div>

      <div class="weui-msg__extra-area" v-show="false">
        <div class="weui-footer">
          <p class="weui-footer__links">
            <a href="javascript:void(0);" class="weui-footer__link">底部链接文本</a>
          </p>
          <p class="weui-footer__text">Copyright © 2008-2016 weui.io</p>
        </div>
      </div>

    </div>
  </div>
</template>
<style>
</style>
<script>
  import _mixin from "./_mixin"

  export default {
    name: 'page-error',
    title: '页面不存在',
    data() {
      return {
        dTitle: '哎呀！页面出错了',
        dMsg: '请联系管理员或技术支持',
      }
    },
    mixins: [_mixin],
    created() {
    },
    components: {}
  }
</script>
