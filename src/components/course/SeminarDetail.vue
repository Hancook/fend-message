<template>

  <div class="seminar_detail_content">
    <button @click="$emit('close')" class="spoc_seminar_back_btn">返回列表</button>
    <div class="seminar_detail">
      <h3>{{$route.query.siteName}}</h3>
      <div>
        <div class="reply_content_fill">
          <div class="reply_title">
            <label>标题：</label>
            <input type="text" v-model="replyTitle">
          </div>
          <div class="reply_content">
              <textarea id="textarea" class="weui-textarea reply_textArea" placeholder="最多输入300字…" rows="4"
                        v-model="replyContent">

              </textarea>
            <!--<x-textarea :max="500" v-model="content" :placeholder="$t('输入内容（500字内）')"></x-textarea>-->
            <!--<div class="weui_textarea_counter">-->
            <!--<span id="count" v-text="contentLen"></span>/<span id="count_max" v-text=""></span>-->
            <!--</div>-->
            <button class="reply_confirm" :class="{'weui-btn_disabled':!canPost}" @click="clickAdd">
              <strong v-if="disabledTime===null">提交</strong>
              <strong v-else>提交 ({{disableTimeStr}}s)</strong>
            </button>
            <button class="reply_reset" @click="replyReset">取消</button>

          </div>

        </div>
      </div>
      <!--回复条数-->
      <p class="reply_total_num" v-if="listData&&listData!=null">共{{listData.total}}条</p>
      <!--获取回复列表-->
      <div class="seminar_reply_lists">
        <paging ref="paging" :fetch-page-data="fetchPageData" class="weui-cells weui-cells-list">
          <slot></slot>
          <template slot="item" scope="props">

            <!--{{props|log}}-->
            <template v-for="theme in {__:props.item}">
              <div class="weui-cell weui-cell_access seminar_reply_list">
                <div class="weui-cell__bd">
                  <div class="seminar_reply_msg">
                    <span class="seminar_replay_name">
                     {{theme.userName}}
                    </span>
                    <span>
                      {{timeChange(theme.createTime)}}
                    </span>
                    <span class="reminar_replay_index">
                      {{props.index+1}}楼
                    </span>
                  </div>
                  <div class="seminar_replay_content">
                    <h4 class="replay_title" v-html="theme.title"></h4>
                    <div class="replay_content" v-html="getTitleContent(theme.content)"></div>
                    <a class="replay_to" @click="replyTo(props.index+1)">回复TA</a>
                  </div>
                </div>
              </div>


            </template>

          </template>
        </paging>

      </div>
    </div>


  </div>


</template>

<script>
  import {catchAxiosError, getTitleContent, timeChange} from "../../utils/common"
  import {Toast} from 'mint-ui'

  const DISABLED_TIME_DURATION = 1000 * 3
  export default {
    name: 'SeminarIndex',
    data() {
      return {
        replyTitle: '',
        replyContent: '',
        tid: '',// 话题id
        contentMax: 300,
        posting: null,//正在提交
        disabledTime: null,
        disableTimeStr: null,
        listData: null,
        pageParams: null
      }
    },
    props: [
      'tId',
      'tContent',
      'tSectionId',
      'tTitle'
    ],
    created() {
      const vm = this
      vm.tid = vm.tId
      if (!vm.tid) {
        Toast('topicId为空')
      }

    },
    methods: {
      timeChange, getTitleContent,
      fetchPageData(pageParams, complete) {
        const vm = this
        vm.pageParams = pageParams
//        vm.tid = vm.Ti
//        console.log(vm.siteId)
        let url = 'forum/topic/' + vm.tId + '/reply?page=' + (pageParams.page + 1)
//        console.log(pageParams)
        vm.$axios.get(url).then(res => {
          const success = res.data.code == 1
          if (!success) {
            Toast('获取主题列表失败' + (res.data.message || ''))
          }
          vm.listData = res.data.data
          var pageData = {
            content: res.data.data.list,
            numberOfElements: res.data.data.size,
            size: res.data.data.pageSize,
            totalElements: res.data.data.total
          }
//          console.log('1', pageData)

          complete && complete(success, pageData)
        }).catch(res => {
          complete && complete(false, null)
          catchAxiosError(res, vm)
        })
      },
//      getTid() {
//        const vm = this
////        const route = vm.$route
////        const query = route.query
////        const params = route.params
//        return tId
//      },
      resetInput() {
        const vm = this
        vm.content = ''
      },
      resetDisableTimer() {
        const vm = this
        clearInterval(vm._disableTimer)
        vm.disabledTime = null
        vm.disableTimeStr = null
      },
      startDisableTimer() {
        const vm = this
        vm.resetDisableTimer()
        const checkTimer = () => {
          const duration = Date.now() - vm.disabledTime
          if (duration > DISABLED_TIME_DURATION) {
            vm.resetDisableTimer()
          } else {
            vm.disableTimeStr = Math.ceil((DISABLED_TIME_DURATION - duration) / 1000)
          }
        }
        vm.disabledTime = Date.now()
        checkTimer()
        vm._disableTimer = setInterval(checkTimer, 500)
      },
      clickAdd() {
        const vm = this
        $(window).scrollTop(0)

        if (vm.canPost) {
          vm.posting = true
          vm.postAdd(success => {
            vm.posting = false
            if (success) {
              vm.resetInput()
              vm.startDisableTimer()
            }
          })
        } else {
          if (!vm.titleLen) {
            Toast('请填写标题')

          } else {
            if (!vm.contentLen) {
              Toast('请填写内容')
            } else {
              if (vm.contentLen > vm.contentMax) {
                Toast('最多可输入' + vm.contentMax + '字')
              }
            }
          }
        }
      },
      replyTo(data) {
        const vm = this
        vm.replyTitle = '回复#' + data
        vm.replyContent = ''
        vm.clickAdd()
      },
      //点击取消清空回复信息
      replyReset() {
        const vm = this
        vm.replyContent = ''
        vm.replyTitle = ''
      },
      // 获取已签到数据
      postAdd(complete) {
        const vm = this
        const params = {
          'content': vm.replyContent,
          "tid": vm.tId,
          'sectionId': vm.tSectionId,
          'title': vm.replyTitle
        }
        vm.$axios.post('forum/reply', params).then(res => {
          const success = res.data.code == 1;
          if (success) {
            Toast(res.data.msg)
            vm.resetPaging()
            vm.replyContent = ''
            vm.replyTitle = ''
          } else {
            Toast('提交失败:' + (res.data.msg || ''))
//            alert('获取签到数据失败')
          }
          complete && complete(success)
        }).catch(res => {
          complete && complete(false)
          catchAxiosError(res, vm)
        })
      },
      resetPaging() {
        const vm = this
        vm.$nextTick(() => vm.$refs.paging.resetLoadMore())
      },
    },
    computed: {
      canPost() {
        return this.titleLen > 0 && this.contentLen > 0 && this.contentLen <= this.contentMax && !this.posting && !!this.tId && this.disabledTime === null
      },
      titleLen() {
        return (this.replyTitle || '').trim().length
      },
      contentLen() {
        return (this.replyContent || '').trim().length
      },
      loading() {
        return this.posting === true
      },
    },
  }
</script>

<style lang="less" type="text/less">
  .sp_page_padding {
    .weui-panel:after, .weui-panel:before {
      content: none;
    }
  }

  .sp_page_seminar {
    .weui-panel_list {
      .weui-panel__bd {
        padding: 14px 15px 10px;
      }
    }
  }

</style>
