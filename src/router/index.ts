// router modify @todo
import { createRouter } from 'vue2-helpers/vue-router'
import { RouteConfig } from 'vue-router'
// import Editor from '../views/Editor/Index.vue'
import Activity from '../views/Activity.vue'
import Page from '../views/Page.vue'

const routes: Array<RouteConfig> = [
  // {
  //   path: '/Editor/:pageId?',
  //   name: 'Editor',
  //   component: Editor,
  // },
  // {
  //   path: '/PreBuild',
  //   name: 'PreBuild',
  //   component: Editor,
  // },
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
