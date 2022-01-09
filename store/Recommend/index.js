export default {
  namespace: true,
  state() {
    return {
      invitationData: null,
      userData: {},
      recommendation: [],
    }
  },
  mutations: {
    update(state, { key, value }) {
      state[key] = value
    },
  },
  actions: {
    getData({ commit, rootState }) {
      setTimeout(() => {
        commit('update', {
          key: 'invitationData',
          value: {
            pictures: [],
            userCount: 2,
          },
        })
      }, 1000)
    },
    getUserAccountData({ commit, rootState }) {
      setTimeout(() => {
        commit('update', {
          key: 'userData',
          value: {
            now: 5,
            total: 10,
          },
        })
      }, 1000)
    },
    init({ commit, dispatch, rootState }) {
      dispatch('getData')
      dispatch('getUserAccountData')
      console.log('init')
      commit('update', {
        key: 'recommendation',
        value: [
          { a: 1, foo: 'bar' },
          { a: 2, foo: 'bab' },
        ],
      })
    },
    update({ commit, dispatch, rootState }) {
      dispatch('getData')
      dispatch('getUserAccountData')
    },
  },
}
