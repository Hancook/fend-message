<template>
  <div>
    <div class="sp_homework_submitted_con">
      <paging :fetch-page-data="fetchPageData" class="weui-cells weui-cells-list">

        <slot></slot>

        <template slot="item" scope="props">
          <template v-for="homework in {__:props.item}">
            <div class="sp_homework_submitted weui-cell weui-cell_access">
              <div class="weui-cell__bd sp_homework_lists">
                <p class="sp_homework_msg">{{homework.createtime|spoc_date}}</p>
                <h3 class="sp_homewor_name">{{homework.title}}</h3>
                <div class="sp_homewor_msg_list">
                  <ul>
                    <li>类型：
                      <em v-if="homework.isgroup==0">个人</em>
                      <em v-if="homework.isgroup==1">小组</em>
                    </li>
                    <li v-if="homework.status==3">
                      得分：<em class="base_color">{{homework.personalPoint}}</em>
                      <em v-if="homework.isgroup==1">/{{homework.groupPoint}}</em>分
                      <i class="sp_classify">
                        <em v-if="homework.isgroup==1">(个人/小组)</em>
                      </i>
                    </li>
                    <li v-if="homework.status==1">
                      状态：
                      <em>待批阅</em>

                    </li>
                  </ul>
                </div>
              </div>
              <!--<div class="weui-cell__ft spoc_jump_icon course_list_jump_icon" v-if="homeWork.status==3"></div>-->
            </div>
          </template>
        </template>
      </paging>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Submit',
    data() {
      return {}
    },
    props:['homeWork'],
    methods: {
      fetchPageData(pageParams, complete) {
        const vm = this
        vm.sideId = vm.$route.query.siteid
//        vm.tid = vm.Ti
//        console.log(vm.siteId)
        let url = 'homework/list?page=' + (pageParams.page + 1) + '&siteId=' + vm.sideId + '&finish=true'
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
//          console.log('1', pageData)

          complete && complete(success, pageData)
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
