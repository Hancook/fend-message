<template>

  <div>
    <div v-if="!detailShow">
      <div class="weui-panel__hd" style="overflow:hidden;background-color: #3dd2ad;color: white;line-height:2.0rem;"><span class="spoc_curCourseName">当前课程：{{this.$route.query.siteName}}</span>
        <a href="javascript:history.go(-1)" class="spoc_seminar_select">
          选择课程
          <span class=sel_course_icon>
             <img src="../../../static/images/more.png" alt="">
       </span>
        </a>
      </div>
      <div class="spoc_seminar_list">
        <paging :fetch-page-data="fetchPageData" class="weui-cells weui-cells-list">

          <slot></slot>
          <template slot="item" scope="props">
            <template v-for="theme in {__:props.item}">
              <div class="weui-cell weui-cell_access" @click="showSeminarDetail(theme)">
                <div class="weui-cell__bd" style="width: 90%;">
                  <div class="seminar_user_img">
                    <img v-if="theme.headImageUrl&&theme.headImageUrl!=null" :src="theme.headImageUrl" alt="">
                    <img v-if="theme.headImageUrl==null" src="../../../static/images/user.png" alt="">

                  </div>
                  <div class="seminar_theme_msg">
                    <h3>{{theme.title}}</h3>
                    <p>
                    <span>
                     {{theme.userName}}
                     <em class="user_job" v-if="parseInt(theme.isTeacherThread)==1">教师</em>
                      <!--{{theme.isTeacherThread}}-->
                    </span>
                      <span>
                      回复：{{theme.replyNum}}
                    </span>
                      <span v-if="parseInt(theme.isTeacherThread)==1">
                      状态：
                      <em v-if="parseInt(theme.isReplay)==1">已回复</em>
                      <em v-if="parseInt(theme.isReplay)==2">未回复</em>
                    </span>
                    </p>

                  </div>
                </div>
                <div class="weui-cell__ft spoc_jump_icon"></div>
              </div>


            </template>

          </template>
        </paging>
      </div>
    </div>
    <seminar-detail
      ref="seminar-detail"
      @close="detailShow=false"
      v-if="!!detailShow"
      :t-id="themeCur.tid"
      :t-content="themeCur.content"
      :t-section-id="themeCur.sectionId"
      :t-title="themeCur.title">
    </seminar-detail>
  </div>

  <!--</div>-->


  <!--<loading-toast v-model="loading"></loading-toast>-->
</template>

<script>
  import {catchAxiosError} from "../../utils/common"
  import {Toast} from 'mint-ui'

  const DISABLED_TIME_DURATION = 1000 * 3
  export default {
    name: 'curDetail',
    data() {
      return {
        detailShow: false,
        themeCur: null,
      }
    },
    created() {
      const vm = this
    },
    methods: {
      //点击呈现交流详情
      showSeminarDetail(dialog) {
        const vm = this
        vm.themeCur = dialog
        vm.detailShow = true

      },
      fetchPageData(pageParams, complete) {
        const vm = this
        vm.siteId = vm.$route.query.siteid
//        console.log(vm.siteId)
        let url = 'forum/topic?page=' + (pageParams.page + 1) + '&siteId=' + vm.siteId
//        console.log(pageParams)
        vm.$axios.get(url).then(res => {
          const success = res.data.code == 1
          if (!success) {
            Toast('获取主题列表失败' + (res.data.message || ''))
          }
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
//        const route = vm.$route
//        const query = route.query
//        const params = route.params
//        return query['id'] || query['tid'] || query['topicId'] || params['id'] || params['topicId']
//      },
//      resetInput() {
//        const vm = this
//        vm.content = ''
//      },
//      resetDisableTimer() {
//        const vm = this
//        clearInterval(vm._disableTimer)
//        vm.disabledTime = null
//        vm.disableTimeStr = null
//      },
//      startDisableTimer() {
//        const vm = this
//        vm.resetDisableTimer()
//        const checkTimer = () => {
//          const duration = Date.now() - vm.disabledTime
//          if (duration > DISABLED_TIME_DURATION) {
//            vm.resetDisableTimer()
//          } else {
//            vm.disableTimeStr = Math.ceil((DISABLED_TIME_DURATION - duration) / 1000)
//          }
//        }
//        vm.disabledTime = Date.now()
//        checkTimer()
//        vm._disableTimer = setInterval(checkTimer, 500)
//      },
//      clickAdd() {
//        const vm = this
//        if (vm.canPost) {
//          vm.posting = true
//          vm.postAdd(success => {
//            vm.posting = false
//            if (success) {
//              vm.resetInput()
//              vm.startDisableTimer()
//            }
//          })
//        }
//      },
//      // 获取已签到数据
//      postAdd(complete) {
//        const vm = this
//        const params = {
//          "content": vm.content,
//          "tid": vm.tid
//        }
//        vm.$axios.post('forum', params).then(res => {
//          const success = res.data.status == 0;
//          if (success) {
//            vm.resetPaging()
//          } else {
//            Toast('提交失败 ' + (res.data.message || ''))
////            alert('获取签到数据失败')
//          }
//          complete && complete(success)
//        }).catch(res => {
//          complete && complete(false)
//          catchAxiosError(res, vm)
//        })
//      },
//      resetPaging() {
//        const vm = this
//        vm.$nextTick(() => vm.$refs.paging.resetLoadMore())
//      },
//      fetchPageData(pageParams, complete) {
//        const vm = this
//        const params = {
//          ...pageParams,
//        }
//        vm.$axios.get(`forum/${vm.tid}/replies`, {params}).then(res => {
//          const success = res.data.status == 0
//          if (!success) {
//            Toast('获取学习交流列表失败' + (res.data.message || ''))
//          }
//          complete && complete(success, res.data.data)
//        }).catch(res => {
//          complete && complete(false)
//          catchAxiosError(res, vm)
//        })
//      },
    },
    computed: {
      canPost() {
        return this.contentLen > 0 && this.contentLen <= this.contentMax && !this.posting && !!this.tid && this.disabledTime === null
      },
      contentLen() {
        return (this.content || '').trim().length
      },
      loading() {
        return this.posting === true
      },
    },
    components: {
      seminarDetail: require('./SeminarDetail.vue')
    },
  }
</script>

<style lang="less" type="text/less">
  .sp_page_padding {
    padding: 0;
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
