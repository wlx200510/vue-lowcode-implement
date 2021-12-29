import Vue from 'vue'
import Index from './index'
import router from './router'
import ClientPlugin from '@/clientKits'
import '@/assets/reset.css'

Vue.config.productionTip = false
Vue.use(ClientPlugin)

new Vue({
  el: '#app',
  router,
  render: (h) => h(Index),
})
