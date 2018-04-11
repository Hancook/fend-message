<template>
  <component :is="page" :page-data="pageData" v-if="page"></component>
</template>

<script>
  /**
   * 全局页面 通过vuex控制
   */
  import {mapGetters} from 'vuex'
  import types from "../../store/global/types"

  export default {
    name: 'CoverPage',
    data() {
      return {
        pageCompo: '',
      }
    },
    methods: {},
    watch: {
      $route(route) {
        const vm = this
        if (!route.path.startsWith('/_')) {
          vm.$store.dispatch(types.ACTIONS.clearCoverPage)
        }
      }
    },
    computed: {
      ...mapGetters({
        coverPage: types.GETTERS.coverPage
      }),
      page() {
        return this.coverPage.page
      },
      pageData() {
        return this.coverPage.data
      },
    },
    created() {
      const vm = this
    },
  }
</script>

<style>
</style>
