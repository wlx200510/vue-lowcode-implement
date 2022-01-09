export default {
  state() {
    return {
      pageData: null,
      userAccount: {},
    }
  },
  mutations: {
    update(state, { key, value }) {
      state[key] = value
    },
  },
  actions: {
    getPageData({ commit, rootState }) {
      setTimeout(() => {
        commit('update', {
          key: 'pageData',
          value: {
            imgs: [],
            userNumber: 2,
          },
        })
      }, 1000)
    },
    getUserAccountData({ commit, rootState }) {
      setTimeout(() => {
        commit('update', {
          key: 'userAccount',
          value: {
            buy: 1,
            purchase: 2,
            total: 10,
          },
        })
      }, 1000)
    },
    init({ commit, dispatch, rootState }) {
      dispatch('getPageData')
      dispatch('getUserAccountData')
    },
  },
}
