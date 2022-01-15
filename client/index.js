import Vue from 'vue'
import App from './app'
import getDynamicRouter from './router'
import store from './store'
import '@/assets/reset.css'

import DynamicLoader from '../src/dynamicPlugin/dynamic'

Vue.config.productionTip = false
store.dispatch('getPageData').then((pageData) => {
  const pluginLoader = new DynamicLoader(pageData.projectPlugins)
  store.getAsyncModule(pageData.projectType)
  const router = getDynamicRouter(pageData.pages)
  pluginLoader.loadPlugins(Vue).then(() => {
    new Vue({
      el: '#app',
      router,
      store,
      render: (h) => h(App),
    })
  })
})
