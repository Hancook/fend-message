<template>
    <div class="selector-api">
      <select style="color: #333" :title="baseApi" v-model="baseApi">
          <option
            v-for="api in API_LIST" :value="api.value"
            :title="api.value" v-text="api.name">
          </option>
      </select>
    </div>
</template>

<script>
  import { API_BASE_URL_DEV, API_BASE_URL_DEV_TEST, LOCAL_STORAGE__BASE_API, ENV_CONFIG } from '../../utils/constants'

  const API_LIST = [
    {
      value: API_BASE_URL_DEV_TEST,
      name: '开发 API'
    },
    {
      value: API_BASE_URL_DEV,
      name: '模拟 API'
    },
  ]
  export default {
    name: 'ApiSelector',
    data(){
      Object.assign(this, {
        API_LIST,
      })
      return {
        baseApi: ENV_CONFIG.apiBaseUrl
      }
    },
    methods: {
      resetApiTo(baseApi){
        window.localStorage.clear()
        window.localStorage.setItem(LOCAL_STORAGE__BASE_API, baseApi)
        window.location.reload()
      }
    },
    created(){
      let vm = this
      vm.$watch('baseApi', vm.resetApiTo)
    }
  }
</script>

<style>
</style>
