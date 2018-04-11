<template>
  <div id="app" class="sp_container">
    <!--<div style="width: 32px;height: 32px;position: fixed;right: 0;top: 0;cursor: pointer;z-index: 9999999;"-->
         <!--@click="clearData"></div>-->

    <router-view></router-view>

    <!--<div v-if="IS_ENV_DEV&&['/','/dev_login'].indexOf($route.path)==-1" style="-->
    <!--width: 3em;-->
    <!--height: 20px;-->
    <!--padding: 5px;-->
    <!--text-align: center;-->
    <!--line-height: 20px;-->
    <!--position: fixed;-->
    <!--bottom: 0px;-->
    <!--left: 0px;-->
    <!--cursor: pointer;-->
    <!--z-index: 9999999;-->
    <!--color: #fff;-->
    <!--background-color: rgba(255, 0, 0, 0.43);"-->
    <!--@click="$router.replace('/')">回首页-->
    <!--</div>-->

    <cover-page></cover-page>
  </div>
</template>

<script>
  import Vue from 'vue'
  import types from "./store/global/types"
  import {IS_ENV_DEV} from './utils/constants'
  import './sass/_common.scss'

  //  import 'lib-flexible'
  //  import "./less/style.less"

  export default {
    name: 'app',
    data() {
      const vm = this
      return {
        IS_ENV_DEV
      }
    },
    methods: {
      clearData() {
        const vm = this
        vm.$store.dispatch(types.ACTIONS.loginOut)
        alert('已退出登录')
        location.reload()
      },
    },
    components: {}
  }
</script>
<style>

  html, body, .sp_container {
    width: 100%;
    height: 100%;
  }

  body {
    position: absolute;
    left: 0;
    top: 0;
  }

  .sp_container, .sp_page {
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
  }

  .sp_page {
    width: 100%;
    height: 100%;
  }

  .sp_page_scroll {
    overflow-scrolling: touch;
    overflow-y: auto !important;
  }

  .sp_page_page {
    background-color: #fff;
    z-index: 3;
  }

  .sp_page_padding {
    padding: 8px;
  }

  @import "../static/style/style.css";
</style>
