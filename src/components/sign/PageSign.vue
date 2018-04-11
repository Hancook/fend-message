<template>
  <sign :course-id="courseId" :is-auto-sign="true"></sign>
</template>
<style>
</style>
<script>
  import {getSiteId} from "./utils";
  import {wx, isWx} from 'st_wx'
  import {Toast} from 'mint-ui'

  export default {
    name: 'PageSign',
    data() {
      return {
        siteId: null,
        course: {
          courseId: "1xxxx",
          courseLocation: "华师科学会堂401",
          courseName: "2017年度师生交流会",
          courseTime: Date.now() + 1000 * 60 * 24,
          finish: false,// 是否已签到
        }
      }
    },
    methods: {},
    created() {
      const vm = this
      vm.courseId = getSiteId(vm.$route)
      if (!vm.courseId) {
        Toast('siteId 为空，无法签到')
      }
    },
    components: {
      Sign: require('./Sign.vue')
    }
  }
</script>
