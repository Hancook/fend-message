<template>

  <div style="min-height: 100%; background-color: #f5f5f5;">
    <div class="weui-cells wx_title_select" v-if="!$_.isEmpty(termData)&&loadingShow==false">
      <div class="spoc_select">
        <select class="weui-select" name="testUserId" v-model="termId">
          <option
            v-for="user in termData" :value="user.termCode"
            :title="user.termCode" v-text="user.termName">
          </option>
        </select>
        <i class="arrow-down icon"></i>
      </div>

    </div>
    <div class="weui-panel__bd">
      <div class="weui-loadmore" v-show="loadingShow">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
      </div>
      <div class="weui-media-box weui-media-box_text" v-for="site in siteData"
           v-if="!$_.isEmpty(siteData)&&loadingShow==false">

        <div class="wx_cell_title_box weui-cell weui-cell_access">
          <div class="weui-cell__bd wx_course_title_name">
            <span class="weui-media-box__title wx_course_name">{{site.siteName}}</span>
            <span class="weui-media-box__title wx_course_intro" style="float: right" @click="courseDetailClick(site)"
                  v-if="site.classDesc!=null">
                课程简介
           </span>
          </div>
          <div class="weui-cell__ft spoc_jump_icon course_list_jump_icon" v-if="site.classDesc!=null"></div>
          <div class="weui-cell__ft spoc_jump_icon course_list_jump_icon" style="margin-left:-8px;"
               v-if="site.classDesc!=null"></div>
        </div>


        <p class="weui-media-box__desc wx_key_speaker">主讲人：{{site.teacherName}}</p>
        <p class="weui-media-box__desc wx_course_detail">
          <span class="depart_name">学院：{{site.departmentName}}</span>
          <!--<span>访问量：{{site.siteAccessCount}}</span>-->
          <router-link :to=" {path:'course',query:{siteid:site.siteId,siteName:site.siteName}}">进入课程</router-link>
        </p>
      </div>
      <div class="weui-loadmore weui-loadmore_line" v-if="$_.isEmpty(siteData)&&loadingShow==false">
        <span class="weui-loadmore__tips">暂无内容</span>
      </div>
      <!--<div class="weui-media-box weui-media-box_text">-->
      <!--<h4 class="weui-media-box__title">标题二</h4>-->
      <!--<p class="weui-media-box__desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>-->
      <!--</div>-->
    </div>
    <!--弹层-->
    <div class="js_dialog" v-if="detailDialog" style="opacity: 1;">
      <div class="weui-mask" @click="detailDialog=false"></div>
      <div class="weui-dialog spoc_dialog">
        <div class="weui-dialog__bd course_dialog" v-if="courseDetail.classDesc!=null">
          <h3 class="spoc_dialog_title">{{courseDetail.siteName}}</h3>
          <p class="spoc_dialog_create">主讲人:{{courseDetail.teacherName}}</p>
          <div class="couse_content">
            <div class="course_title">课程简介</div>
            <div class="course_datail_box">
              <p class="course_datail">{{courseDetail.classDesc}}</p>
            </div>
          </div>

        </div>
        <div class="weui-dialog__bd" v-if="courseDetail.classDesc==null">
          暂无简介
        </div>
        <div class="weui-dialog__ft">
          <!--<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">辅助操作</a>-->
          <a class="spoc_dialog_btn" @click="detailDialog=false">知道了</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {Toast} from 'mint-ui'
  import {catchAxiosError} from "../../utils/common"

  export default {
    name: 'CoursePageList',
    data() {
      return {
        siteData: null,
        termData: null,
        courseDetail: null,
        termId: '',
        loadingShow: false,
        detailDialog: false,
      }
    },
    methods: {
      courseDetailClick(e) {
        const vm = this
        vm.detailDialog = true
//        console.log(e)
        vm.courseDetail = e
      },
      termDataList() {
        const vm = this
        const params = {
          "termCode": null,  // 学期id 为空时取所有
          "userId": "2017090001"	// 用户id
        }
        vm.$axios.post(`site`, params).then(res => {
          const success = res.data.status == 0
          if (!success) {
            Toast('获取学期列表失败' + (res.data.message || ''))
          } else {
//            if (res.data.data != null) {
//              vm.termData = res.data.data.termList
//              vm.termId = vm.termData.filter(a => a.isCurrent == "1")[0].termCode
//            } else {
//              vm.termData = res.data.data.termList
//              vm.termId = vm.termData.filter(a => a.isCurrent == "1")[0].termCode
//            }
            vm.termData = res.data.data.termList.sort((a, b) => {
              return b.termCode - a.termCode
            })
            vm.termId = vm.termData.filter(a => a.isCurrent == "1")[0].termCode
//            console.log(vm.termId)
          }
        }).catch(res => {
          catchAxiosError(res, vm)
        })
      },
      courseData() {
        const vm = this
        vm.loadingShow = true
        const params = {
          "termCode": vm.termId,  // 学期id 为空时取所有
          "userId": "2017090001"	// 用户id
        }
        vm.$axios.post(`site`, params).then(res => {


          const success = res.data.status == 0
          if (!success) {
            vm.loadingShow = false
            Toast('获取课程列表失败' + (res.data.message || ''))
          } else {
            if (res.data.data != null) {
              vm.siteData = res.data.data.siteList
              vm.loadingShow = false
            } else {
              vm.siteData = null
              vm.loadingShow = false
            }

          }
        }).catch(res => {
          vm.loadingShow = false
          catchAxiosError(res, vm)
        })
      },
    },
    computed: {},
    created() {
      const vm = this
      vm.termDataList()
      if (vm.$_.isEmpty(vm.termId)) {
        vm.courseData()
      }

    },
//    components: {
//      loadingIcon,
//    },
    mounted() {
      const vm = this
      vm.$watch('termId', function () {
        vm.courseData()
      }, {deep: true})

    },
  }
</script>

<style>

</style>
