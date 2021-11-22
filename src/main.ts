import Vue, { VueConstructor } from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
import 'animate.css'

// 使用 vant
import { setupVant } from './plugins/vant'
import { setupElement } from './plugins/element'
// 使用 element-plus
setupElement(Vue)
setupVant(Vue)
Vue.use(VueCompositionApi)
Vue.config.productionTip = false

const eventBus = {
  install(Vue: VueConstructor) {
    Vue.prototype.$bus = new Vue()
  },
}
Vue.use(eventBus)

const app = new Vue({ router, store, render: (h) => h(App) })
router.isReady().then(() => app.$mount('#app'))
