import Vue from 'vue'

const COMMON_COMPONENTS = [
  require('./Paging.vue'),
  require('./LoadingToast.vue'),
  require('./CoverPage.vue'),
  require('./WDialog.vue'),
]

export default function (router, store) {
  //
  COMMON_COMPONENTS.forEach(compo => Vue.component(compo.name, compo))
}
