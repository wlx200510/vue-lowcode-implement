import { createStore } from 'vue2-helpers/vuex'
import {
  createProject,
  getAllProject,
  updateProject,
  deleteProject,
} from '../services/lowcode'

export default createStore({
  state: {
    projects: [],
    project: {
      type: 0, // 活动类型
      pages: [
        {
          basicSetting: {
            title: '',
            bgImage: '',
            bgColor: '',
          },
          plugins: [], // 支持的插件能力
          routerConfig: {
            name: '',
            path: '',
          },
          isPreBuild: false,
          pageData: {
            preBuildConfig: {},
            buildConfig: null,
          },
        },
      ],
    },
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload
    },
  },
  actions: {
    getAllProjects({ dispatch, commit }) {
      return getAllProject().then((data) => {
        commit('setProjects', data)
      })
    },
    createNewProject({ dispatch, commit }, data) {
      return createProject(data).then(() => dispatch('getAllProjects'))
    },
    updateOldProject({ dispatch, commit }, data) {
      return updateProject(data).then(() => dispatch('getAllProjects'))
    },
    deleteProject({ dispatch, commit }, id) {
      return deleteProject(id).then(() => dispatch('getAllProjects'))
    },
  },
  modules: {},
})
