<template>
  <div>
    <div class="weui-panel__hd" style="overflow:hidden;background-color: #3dd2ad;color: white;line-height:2.0rem;"><span
      class="spoc_curCourseName">当前课程：{{this.$route.query.siteName}}</span>
      <a href="javascript:history.go(-1)" class="spoc_seminar_select">
        选择课程
        <span class=sel_course_icon>
             <img src="../../../../static/images/more.png" alt="">
       </span>
      </a>
    </div>

    <!--暂无内容-->

    <!--<div class="weui-loadmore weui-loadmore_line" v-if="true">-->
    <!--<span class="weui-loadmore__tips">暂无内容</span>-->
    <!--</div>-->

    <!--tab-->
    <div class="tab_container">

      <div class="sp_page sp_page_homework">
        <div class="sp_tab sp_tab_msg sp_homework_list">
          <div class="sp_tab_item"
               v-for="(tab,index) in tabs"
               :style="{'width':tabWidthPercent+'%'}"
               :class="{'active':curTabIndex==index}"
               @click="clickSelect(index)">
            <span>{{tab.name}}</span>
          </div>
        </div>


        <transition name="tab-fade" v-for="(tab,index) in tabs" key="tab.id"
                    @after-enter="$refs.tabCompos[index].$$el.trigger('scroll')">

          <component :is="tab.component" v-if="tab._visited==true" v-show="curTabIndex==index" ref="tabCompos">

          </component>

        </transition>
      </div>
    </div>

  </div>
</template>
<script>
  import {catchAxiosError, cloneData, getStorageDataAndDecode, setStorageDataAndEncode} from "../../../utils/common";
  import {LOCAL_STORAGE__MESSAGE_TAB_INDEX} from "../../../utils/constants";

  export default {
    name: 'MyHomework',
    data() {
      return {
        unCommitNum: 0,
        tabs: null,
//          {
//            name: '未提交',
//            _visited: false,
//            id: 0,
//            component: require('./NoCommitted.vue')
//          },
//          {
//            name: '已提交',
//            _visited: false,
//            id: 1,
//            component: require('./Submitted.vue')
//          },
//        ],
        curTabIndex: 0,
        pageParams: null,
        complete: null,
//        listData: null,
//        pageData: null,
      }
    },
    methods: {
      //获取数据
//      fetchPageData(pageParams, complete) {
//        const vm = this
//        vm.pageParams = pageParams
//        vm.complete = complete
////        vm.tabIndex = 0
//        if (vm.curTabIndex == 0) {
//          vm.tabIndex = 0
//          vm.isFinish = false
////          pageParams.page = 0
//        } else {
//          vm.tabIndex = 1
//          vm.isFinish = true
//        }
//        vm.sideId = vm.$route.query.siteid
//        let url = 'homework/list?page=' + (pageParams.page + 1) + '&siteId=' + vm.sideId + '&finish=' + vm.isFinish
////        console.log(pageParams)
//        vm.$axios.get(url).then(res => {
//          const success = res.data.code == 1
////          console.log(res.data)
//          if (!success) {
//            Toast('获取主题列表失败' + (res.data.message || ''))
//          }
//          vm.listData = res.data.data
//          if (vm.isFinish == false) {
//            vm.unCommitNum = vm.listData.total
//          }
//          vm.pageData = {
//            content: vm.listData.list,
//            numberOfElements: vm.listData.size,
//            size: vm.listData.pageSize,
//            totalElements: vm.listData.total
//          }
//          complete && complete(success, vm.pageData)
//        }).catch(res => {
//          complete && complete(false, null)
//          catchAxiosError(res, vm)
//        })
//      },
      getTab() {
        const vm = this
        vm.curTabIndex = 0
        return vm.tabs = [
          {
            name: '未提交',
            _visited: true,
            id: 0,
            component: require('./NoCommitted.vue')
          },
          {
            name: '已提交',
            _visited: false,
            id: 1,
            component: require('./Submitted.vue')
          },
        ]
      },
      clickSelect(index) {
        const vm = this
        vm.tabs[index]._visited = true
        vm.curTabIndex = index
        setStorageDataAndEncode(LOCAL_STORAGE__MESSAGE_TAB_INDEX, index)
      },
      getStoreTabIndex() {
        const index = parseInt(getStorageDataAndDecode(LOCAL_STORAGE__MESSAGE_TAB_INDEX))
        if (index && (index < 0 || index >= this.tabs.length)) {
          return 0
        }
        return index
      },
    },
    computed: {
      tabWidthPercent() {
        return 100 / this.tabs.length
      },
    },
    created() {
      const vm = this
      vm.getTab()
//      vm.clickSelect(vm.getStoreTabIndex() || 0)
    },
    mounted() {
      let vm = this
//      vm.$watch('unCommitNum', function () {
//        vm.getTab()
//
//      }, {deep: true})
    },
    components: {},
  }
</script>
<style type="text/less" lang="less">

</style>
