import Vue from 'vue'
import Vuex from 'vuex'
import { apiGetProject } from '../services/lowcode'

// 底部的rootStore可以封装打点函数和用户信息等基本数据

Vue.use(Vuex)

function getAsyncModule(moduleName) {
  import(`../../store/${moduleName}/index.js`).then((data) => {
    this.registerModule([moduleName], data.default)
    return data.default
  })
}

Vuex.Store.prototype.getAsyncModule = getAsyncModule

export default new Vuex.Store({
  state: {
    userInfo: {
      userId: 0,
    },
    pageData: null,
    hash: null,
    query: {},
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
    },
    setPageData(state, data) {
      state.pageData = data
    },
    setQuery(state, query) {
      state.query = query
    },
    setHash(state, hash) {
      state.hash = hash
    },
  },
  actions: {
    getUserData({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        resolve({
          userId: 112938394,
          openId: '&&&&&&&038373',
        })
      }).then((data) => {
        console.log(data)
        commit('setUserInfo', data)
      })
    },
    getPageData({ state, commit }) {
      console.log(state.query)
      const projectId = state.query.projectId || 1
      return apiGetProject(projectId).then((data) => {
        commit('setPageData', data)
        return data
      })
    },
  },
})
