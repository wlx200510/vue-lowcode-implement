import Vue from 'vue'
import Index from './index'
import router from './router'
import '@/assets/reset.css'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: (h) => h(Index),
})
