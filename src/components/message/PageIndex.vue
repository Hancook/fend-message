<template>
  <div class="sp_page  sp_page_message">

    <div class="sp_tab sp_tab_msg">
      <div class="sp_tab_item"
           v-for="(tab,index) in tabs"
           :style="{'width':tabWidthPercent+'%'}" :class="{'active':curTabIndex==index}"
           @click="clickSelect(index)">
        <span>{{tab.name}}</span>
      </div>
    </div>

    <transition name="tab-fade" v-for="(tab,index) in tabs" key="tab.id"
                @after-enter="$refs.tabCompos[index].$$el.trigger('scroll')">
      <component :is="tab.component" v-if="tab._visited==true" v-show="curTabIndex==index" ref="tabCompos"></component>
    </transition>

  </div>
</template>

<script>
  import {cloneData, getStorageDataAndDecode, setStorageDataAndEncode} from "../../utils/common";
  import {LOCAL_STORAGE__MESSAGE_TAB_INDEX} from "../../utils/constants";


  export default {
    name: 'MessagePageIndex',
    data() {
      return {
        tabs: [
          {
            name: '班级通知',
            _visited: false,
            id: 0,
            component: require('./clazz_notice/List.vue')
          },
          {
            name: '系统通知',
            _visited: false,
            id: 1,
            component: require('./sys_notice/List.vue')
          },
        ],
        curTabIndex: 0,
      }
    },
    methods: {
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
      vm.clickSelect(vm.getStoreTabIndex() || 0)
    },
    mounted() {
    },
    destroyed() {
    },
    components: {},
  }
</script>

<style type="text/less" lang="less">

  .sp_page_message {
    position: relative;
    background-color: #F8F8F8;
    .sp_tab {
      background-color: #F8F8F8;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
    }
  }

  .sp_tab {
    position: relative;
    z-index: 3;
    padding: 20px;
    box-sizing: border-box;
  }

  .sp_tab_item {
    color: #888888;
    > span {
      display: inline-block;
      border-bottom: 2px solid transparent;
    }

    &.active {
      color: #222222;
      > span {
        border-bottom-color: #3CB798;
      }
    }
    display: inline-block;
    width: 50%;
    text-align: center;
    box-sizing: border-box;
    &:nth-of-type(n+2) {
      border-left: 1px solid #DCDCDC;
    }
  }

  .sp_page_message {

    .sp_paging {
      padding-top: 60px;
      box-sizing: border-box;
      background-color: #F8F8F8;
    }
  }

  .tab-fade-enter-active {
    transition: opacity 0.3s ease;
  }

  .tab-fade-enter {
    opacity: 0;
  }

  .sp_paging.weui-cells {
    &:after {
      display: none;
    }
  }

</style>
