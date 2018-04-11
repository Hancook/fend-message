<template>
  <div id="links">
    <h2>页面导航</h2>

    <!--一级-->
    <dl>
      <li v-for="route in routes" v-if="route.path!=$route.path&&route.path!='/'">
        <router-link push :to="handleRoute(route.path,route)">{{route.path}} {{route.desc}}</router-link>

        <!--二级-->
        <ul v-if="route.children&&route.children.length">
          <li v-for="route_child in route.children" v-if="route_child.path!='/'">
            <router-link push :to="handleRoute(route.path+'/'+route_child.path,route_child)">
              {{route_child.path}} {{route_child.desc}}
            </router-link>

            <!--三级-->
            <ul v-if="route_child.children&&route_child.children.length">
              <li v-for="route_child2 in route_child.children" v-if="route_child2.path!='/'">
                <router-link push :to="handleRoute(route.path+'/'+route_child.path+'/'+route_child2.path,route_child2)">
                  {{route_child2.path}} {{route_child2.desc}}
                </router-link>
              </li>
            </ul>

          </li>
        </ul>
      </li>
    </dl>
  </div>
</template>

<script>
  import routes from '../../router/routes.js'

  export default {
    name: 'PageRoutes',
    data() {
      return {
        routes
      }
    },
    methods: {
      handleRoute(path, route) {
        return {
          path,
          query: this.getRouteQuery(route)
        }
      },
      getRouteQuery(route) {
        if (route.meta.needAuth) {
          const token = _.property('global.session.token')(this.$store.state)
          if (token) {
            return {
              _agentType: token['agentType'],
              _corpId: token['corpId'],
            }
          }
        }
        return {}
      }
    },
    computed: {},
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #links {
    padding: 20px;
  }

  ul, dl {
    /*font-size: 15px;*/
    padding: 0;
    list-style: none;
  }

  dl ul {
    padding-left: 26px;
  }
</style>
