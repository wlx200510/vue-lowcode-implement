import Vue from 'vue'
import Vuex from 'vuex'

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
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
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
  },
})
