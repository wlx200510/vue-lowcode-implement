import { createStore } from 'vue2-helpers/vuex'

export default createStore({
  state: {
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
  mutations: {},
  actions: {},
  modules: {},
})
