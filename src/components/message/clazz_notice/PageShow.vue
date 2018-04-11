<template>
  <div class="sp_page sp_page_scroll bdBg">
    <!--content:"测试"-->
    <!--createTime:1504861028539-->
    <!--finish:false-->
    <!--frontCover:null-->
    <!--hasRead:true-->
    <!--id:"402880f75e60914c015e60b500bb000c"-->
    <!--messageType:"BROADCAST"-->
    <!--senderId:"string"-->
    <!--senderName:"string"-->
    <!--title:"string"-->
    <!--updateTime:1504861028539-->
    <template v-for="msg in {__:recordData}" v-if="msg">
      <div class="article-btn" v-if="isFromList">
        <router-link to="/main/message" class="weui-btn weui-btn_primary weui-btn_mini">通知列表</router-link>
      </div>
      <div class="weui-article weui-article-box">
        <template v-for="titles in {__:splitTitle(msg.title)}">
          <!--<h1 class="article-hd">
            <template v-if="titles[0]">
              【<span :class="[getTypeClazz(msg.messageType)]" v-text="titles[0]">作业通知</span>】
            </template>
            {{titles[1]}}
          </h1>-->
          <h1 class="article-hd" v-text="msg.title">
          </h1>
        </template>
        <div class="article-desc"><span class="article-author" v-text="msg.senderName">张老师</span> <span
          class="article-time">{{msg.createTime|spoc_date_sim}}</span></div>
        <hr/>
        <section class="article-bd">
          <!--<h2>1.2 小说：以刻画人物形象为中心</h2>-->
          <div v-html="getTitleContent(msg.content)"></div>
        </section>
      </div>
    </template>

    <loading-toast v-model="loading"></loading-toast>
  </div>
</template>

<script>
  import {catchAxiosError, getTitleContent, splitTitle} from "../../../utils/common"
  import {toWarnPage} from "../../../utils/vm_methods_common"
  import {Toast} from 'mint-ui'
  import {getTypeClazz} from "../utils";

  export default {
    name: 'MessagePageShow',
    data() {
      return {
        content:'\nsssss  \nssssss',
        messageId: null,
        recordData: null,
        fetchingRecord: null,
        postingRead: null,
        isFromList: null,
      }
    },
    created() {
      const vm = this
      vm.messageId = vm.getMessageId()
      vm.initRecord()
    },
    methods: {
      splitTitle, toWarnPage, getTypeClazz,getTitleContent,
//      getTitleContent(val){
//        const vm = this
//        if(val!=null){
//          let content = val.replace(new RegExp("\n", 'g'), '<br />')
//          console.log(content)
//          return content
//        }
//      },
      getMessageId() {
        return this.$route.params['id']
      },
      initRecord() {
        const vm = this
        vm.fetchMessageRecord(success => {
          if (!success) {
            Toast('获取通知详情数据失败')
          } else {
            vm.checkRead()
          }
        })
      },
      fetchMessageRecord(complete) {
        const vm = this
        const params = {}
        vm.fetchingRecord = true
        vm.$axios.get(`message/${vm.messageId}`, {params}).then(res => {
          const success = res.data.status == 0;
          if (success) {
            vm.recordData = res.data.data
          } else {
            vm.toWarnPage({msg: '消息不存在或者已删除'})
          }
          complete && complete(success)
          vm.fetchingRecord = false
        }).catch(res => {
          vm.fetchingRecord = false
          complete && complete(false)
          catchAxiosError(res, vm)
        })
      },
      // 检查是否未读，未读请求标记已读
      checkRead() {
        const vm = this
        // hasRead 为null时说明没有record，无需标记
        if (vm.recordData['hasRead'] === false) {
          vm.postRead()
        }
      },
      postRead(complete) {
        const vm = this
        const params = {}
        vm.postingRead = true
        vm.$axios.put(`message/${vm.messageId}/read`, params).then(res => {
          const success = res.data.status == 0;
          if (!success) {
            Toast('消息标记已读失败')
          }
          complete && complete(success)
          vm.postingRead = false
        }).catch(res => {
          vm.postingRead = false
          complete && complete(false)
          catchAxiosError(res, vm)
        })
      },
    },
    beforeRouteEnter(to, from, next) {
      next(function (vm) {
        vm.isFromList = from.path == '/main/message'
      })
    },
    computed: {
      loading() {
        return this.fetchingRecord
      }
    },
  }
</script>

<style>
</style>
