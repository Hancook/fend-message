<template>
  <div>
    <div class="sp_homework_submitted_con">
      <paging :fetch-page-data="fetchPageData" class="weui-cells weui-cells-list">

        <slot></slot>

        <template slot="item" scope="props">
          <template v-for="homework in {__:props.item}">
            <div class="sp_homework_submitted weui-cell weui-cell_access">
              <div class="weui-cell__bd sp_homework_lists">

                <!--驳回查看-->
                <div class="sp_rejected_con" v-if="homework.status==2">
                  <span @click="getFeedBack(homework)">已驳回</span>
                  <a class="sp_watch" @click="getFeedBack(homework)">查看
                    <i class="course_list_jump_icon"></i>
                  </a>
                </div>
                <p class="sp_homework_msg">类型：
                  <em v-if="homework.isgroup==0">个人作业</em>
                  <em v-if="homework.isgroup==1">小组作业</em>

                </p>
                <h3 class="sp_homewor_name" :class="{'close_date_name':!judgeData(homework.endtime)}">
                  {{homework.title}}</h3>
                <p class="sp_homewor_date" v-if="judgeData(homework.endtime)">
                  <!--截止时间：-->
                  <span
                    class="no_close_date">{{homework.begintime|spoc_date_sim}}~{{homework.endtime|spoc_date_sim}}</span>
                </p>
                <p class="sp_homewor_date close_date" v-if="!judgeData(homework.endtime)"><span>已截止</span></p>

              </div>
            </div>

          </template>
        </template>
      </paging>

    </div>
    <!--</ul>-->
    <!--弹层-->
    <div class="js_dialog" v-if="rejectDialog" style="opacity: 1;">
      <div class="weui-mask" @click="rejectDialog=false"></div>
      <div class="weui-dialog spoc_dialog">
        <div class="weui-dialog__bd course_dialog">
          <h3 class="spoc_dialog_title">{{homeworkName}}</h3>
          <p class="spoc_dialog_create">任课老师：{{homeworkCreatername}}</p>
          <div class="couse_content">
            <div class="course_title">驳回原因：</div>
            <div class="course_datail_box">
              <p class="course_datail">{{feedBackCon}}</p>
            </div>
          </div>

        </div>
        <div class="weui-dialog__ft">
          <!--<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">辅助操作</a>-->
          <a class="weui-dialog__btn weui-dialog__btn_primary spoc_dialog_btn"
             @click="rejectDialog=false">知道了</a>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
  import {catchAxiosError} from "../../../utils/common";

  export default {
    name: 'unCommmit',
    data() {
      return {
        rejectDialog: false,
        feedBackCon: null,
        homeworkCreatername: null,
        homeworkName: null,
        isDeadline: false
      }
    },
    props: ['homeWork'],
    methods: {
      judgeData(data) {
        const vm = this
        let dataCompare = new Date(data).getTime() > Date.now()
//        console.log(dataCompare)
        if (dataCompare) {
          return true
        } else {
          return false
        }
      },
      //获取驳回原因
      getFeedBack(homework) {
        const vm = this
        vm.rejectDialog = true
        vm.homeworkId = homework.id
        vm.homeworkName = homework.title
        vm.homeworkCreatername = homework.creatername

        let url = 'homework/feedBack?homeworkId=' + vm.homeworkId
        vm.$axios.get(url).then(res => {
          if (res.data.code == 1) {
            console.log(res.data)
            vm.feedBackCon = res.data.data
          }
        })
      },
      fetchPageData(pageParams, complete) {
        const vm = this
        vm.sideId = vm.$route.query.siteid
//        vm.tid = vm.Ti
//        console.log(vm.siteId)
        let url = 'homework/list?page=' + (pageParams.page + 1) + '&siteId=' + vm.sideId + '&finish=false'
//        console.log(pageParams)
        vm.$axios.get(url).then(res => {
          const success = res.data.code == 1
//          console.log(res.data)
          if (!success) {
            Toast('获取主题列表失败' + (res.data.message || ''))
          }
          vm.listData = res.data.data
          var pageData = {
            content: vm.listData.list,
            numberOfElements: vm.listData.size,
            size: vm.listData.pageSize,
            totalElements: vm.listData.total
          }
          complete && complete(success, pageData)
          vm.$emit('getUnCommitNum', vm.listData.list.length)
          console.log('1', vm.listData.list.length)
        }).catch(res => {
          complete && complete(false, null)
          catchAxiosError(res, vm)
        })
      },
    },
    computed: {},
    created() {
      let vm = this
    }
  }
</script>

<style>
</style>
