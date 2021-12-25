import Vue from 'vue'
import App from './app'
import router from './router'
import '@/assets/reset.css'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
})
