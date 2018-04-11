<template>
  <div class="sp_paging"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="scrollDisabled"
       infinite-scroll-distance="10">

    <!--<slot></slot>-->
    <!--<span class="weui-loadmore__tips">已加载所有内容,共{{dataList.length}}条</span>-->

    <slot v-for="(item,index) in dataList" :item="item" :index="index" name="item"></slot>
    <div class="weui-loadmore" v-show="loading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">正在加载</span>
    </div>

    <div class="weui-loadmore weui-loadmore_line" v-if="loadOver===true&&!!dataList&&dataList.length===0">
      <span class="weui-loadmore__tips">暂无内容</span>
    </div>

    <div class="weui-loadmore weui-loadmore_line" v-if="loadOver===true&&!!dataList&&dataList.length>0">
      <span class="weui-loadmore__tips">已加载所有内容,共{{dataList.length}}条</span>
    </div>

  </div>
</template>

<script>
  import {catchAxiosError} from "../../utils/common"
  import {InfiniteScroll, Toast} from 'mint-ui'
  import Vue from 'vue'

  Vue.use(InfiniteScroll)

  const DEFAULT_PAGE = 0
  const FETCHING_PAGE_ERROR_RETRY_TIMES = 2

  export default {
    name: 'Paging',
    props: {
      fetchPageData: { // fetchPageData(pageParams,complete(success,data,msg))
        type: Function,
        require: true,
      },
      isClear: {
        type: Number
      }

    },
    data() {
      const vm = this
      vm.loadMore = _.debounce(function () {
        vm.loading = true
        // 分页数据拉去错误 限制重试次数
        if ((vm._fetchPageErrorCount || 0) < FETCHING_PAGE_ERROR_RETRY_TIMES) {
          const pageParams = vm.getPageParams()
          vm.fetchPageData(pageParams, (success, data) => {
            vm.$nextTick(() => vm.loading = false)
            if (success) {
              vm.handlerPageData(data)
//              console.log('2',data)
              vm._fetchPageErrorCount = 0
            } else {
              vm._fetchPageErrorCount = (vm._fetchPageErrorCount || 0) + 1
            }
          })
        } else {
          // Toast('请求错误，请刷新重试')
        }
      }, 10)
      return {
        loading: false,
        loadOver: false,
        curPage: DEFAULT_PAGE,
        dataList: null,
      }
    },
    methods: {
      handlerPageData(data) {
        const vm = this
        let {numberOfElements, size, totalElements, content} = data

        vm.dataList = (vm.dataList || [] ).concat(content)

//        console.log(vm.dataList)

        if (numberOfElements < size || vm.dataList.length >= totalElements) {
          vm.loadOver = true
        }

        vm.curPage++
      },
      getPageParams() {
        const vm = this
        return {
          'page': vm.curPage,
          'size': 12,
          'sort': 'createTime,desc'
        }
      },
      resetLoadMore() {
        const vm = this
        vm.dataList = null
        vm.curPage = DEFAULT_PAGE
        vm.loadOver = false
        vm.loadMore()
        vm._fetchPageErrorCount = 0
      },
    },
    created() {
    },
    mounted() {
      const vm = this
      vm.$$el.trigger('scroll')
      vm.$watch('isClear', function () {
//        console.log("1")
        vm.dataList = null
      }, {deep: true})
    },
    computed: {
      scrollDisabled() {
        return this.loading || this.loadOver
      },
    },
  }
</script>

<style>
  .weui-loadmore_line .weui-loadmore__tips {
    background-color: #f8f8f8;
  }
</style>
