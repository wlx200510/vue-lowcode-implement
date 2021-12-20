import Vue from 'vue'
import Router from 'vue-router'
import path from 'path'
import { firstLetterUpper } from '@/utils/tool'

Vue.use(Router)
const context = require.context(`../src/prePages`, true, /index.vue$/)
const routes = context.keys().map((key) => {
  const compData = context(key).default
  const pathName = path.dirname(key.toString()).slice(2)
  return {
    path: `/pre/${pathName}`,
    component: compData,
    name: firstLetterUpper(pathName),
  }
})

const router = new Router({
  routes,
})

export default router
