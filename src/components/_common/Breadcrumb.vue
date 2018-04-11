<template>
  <!-- 面包屑导航——位置信息 -->
  <div class="iconfont sd_position">
    <router-link tag="span" to="/">{{base}}</router-link> &nbsp;/&nbsp;
    <router-link :to="bread.route" v-for="(bread,index) in breadcrumb" :key="bread.route.path">
      {{bread.name}}{{(index==breadcrumb.length-1)?'':'&nbsp;/&nbsp;'}}
    </router-link>
  </div>
</template>
<style>
</style>
<script>
  export default{
    name: 'Breadcrumb',
    props: {
      base: {default: '', type: String}
    },
    data () {
      return {}
    },
    computed: {
      breadcrumb(){
        let vm = this
        let breadcrumb = vm.$route.matched
          .filter(route => !!(route.meta.breadcrumb || {}).name)
          .map(route => {
            if (route.meta && route.meta.breadcrumb) {
              return {
                route,
                ...route.meta.breadcrumb
              }
            }
          }).filter(bread => !!bread)
        // console.log({breadcrumb})
        return breadcrumb
      }
    },
  }
</script>
