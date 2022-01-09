import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'
import '@/assets/reset.css'

import DynamicLoader from '../src/dynamicPlugin/dynamic'
import pageData from '../dataBase/0.json'

Vue.config.productionTip = false
const pluginLoader = new DynamicLoader(pageData.projectPlugins)
store.getAsyncModule(pageData.projectType)
pluginLoader.loadPlugins(Vue).then(() => {
  new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App),
  })
})
