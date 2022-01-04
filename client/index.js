import Vue from 'vue'
import App from './app'
import router from './router'
import '@/assets/reset.css'

import DynamicLoader from '../src/dynamicPlugin/dynamic'
import pageData from '../dataBase/0.json'

Vue.config.productionTip = false
const pluginLoader = new DynamicLoader(pageData.projectPlugins)
pluginLoader.loadPlugins(Vue).then(() => {
  new Vue({
    el: '#app',
    router,
    render: (h) => h(App),
  })
})
