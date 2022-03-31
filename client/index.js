import Vue from 'vue'
import App from './app'
import getDynamicRouter from './router'
import store from './store'
import '@/assets/reset.css'

import DynamicLoader from '../src/dynamicPlugin/dynamic'

Vue.config.productionTip = false

function parseQuery() {
  const str = location.search || location.hash || ''
  const [hash, query] = str.split('?')
  const result = { hash, query: {} }
  if (query) {
    const strs = query.split('&')
    for (let i = 0; i < strs.length; i++) {
      const [key, value] = strs[i].split('=')
      result.query[key] = value
    }
  }
  return result
}
const { query, hash } = parseQuery()
store.commit('setQuery', query)
store.commit('setHash', hash)
store.dispatch('getPageData').then((pageData) => {
  const pluginLoader = new DynamicLoader(pageData.renderData.projectPlugins)
  store.getAsyncModule(pageData.projectType)
  const router = getDynamicRouter(pageData.renderData.pages)
  pluginLoader.loadPlugins(Vue).then(() => {
    new Vue({
      el: '#app',
      router,
      store,
      render: (h) => h(App),
    })
  })
})
