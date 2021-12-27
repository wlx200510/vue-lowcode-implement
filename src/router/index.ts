// router modify @todo
import { createRouter } from 'vue2-helpers/vue-router'
import { RouteConfig } from 'vue-router'
import Editor from '../views/Editor/Index.vue' // 搭建页面路由
import Prepage from '../views/PreEditor/Index.vue' // 预制页面路由
import Activity from '../views/Activity.vue'
import Page from '../views/Page.vue'

const routes: Array<RouteConfig> = [
  {
    path: '/Editor/:id/:pageId?',
    name: 'Editor',
    component: Editor,
  },
  {
    path: '/PreBuild/:id/:pageId?',
    name: 'PreBuild',
    component: Prepage,
  },
  {
    path: '/Page/:id?',
    name: 'Page',
    component: Page,
  },
  {
    path: '/',
    name: 'Activity',
    component: Activity,
  },
]

const router = createRouter({ routes })

export default router
