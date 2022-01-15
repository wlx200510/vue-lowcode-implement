import Vue from 'vue'
import Router from 'vue-router'
import path from 'path'
import { firstLetterUpper } from '@/utils/tool'
import prePage from './views/prePages'

Vue.use(Router)
const context = require.context(`../src/prePages`, true, /index.vue$/)
const routes = context.keys().map((key) => {
  const pathName = path.dirname(key.toString()).slice(2)
  return {
    path: `${pathName}`,
    component: () =>
      import(
        /* webpackChunkName: "[request]" */ `../src/prePages/${pathName}/index`
      ),
    name: firstLetterUpper(pathName),
  }
})

function getDynamicRouter(pages) {
  const handledRoutes = []
  let defaultRoute = {}
  pages.forEach((routeData) => {
    if (routeData.pageType === 0) {
      // 组装页面，需要放进去
      handledRoutes.push({
        path: `/${routeData.pageConfig.base.router}`,
        component: () =>
          import(/* webpackChunkName: "[request]" */ `./views/dynamic.vue`),
        name: routeData.pageConfig.base.router,
        meta: {
          pageConfig: routeData.pageConfig,
          config: routeData.config,
        },
      })
    } else {
      const prePageData = routes.find(
        (item) => '/pre/' + item.path === routeData.pageConfig.base.router
      )
      if (prePageData) {
        prePageData.meta = {
          ...routeData,
        }
      }
    }
  })
  // 设置默认的重定向路由
  if (handledRoutes.length !== 0) {
    defaultRoute = {
      path: '*',
      redirect: handledRoutes[0]?.path,
    }
  } else {
    defaultRoute = {
      path: '*',
      redirect: `/pre/${routes[0]?.path}`,
    }
  }

  handledRoutes.push({
    path: '/pre',
    name: 'pre',
    component: prePage,
    children: routes,
  })
  handledRoutes.push(defaultRoute)
  return new Router({
    routes: handledRoutes,
  })
}

export default getDynamicRouter
