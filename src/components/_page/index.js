import Vue from 'vue'

const COMPONENTS = [
  require('./_404.vue'),
  require('./_error.vue'),
  require('./_msg.vue'),
  require('./_warn.vue'),
]

export default function () {
  COMPONENTS.forEach(compo => Vue.component(compo.name, compo))
}

