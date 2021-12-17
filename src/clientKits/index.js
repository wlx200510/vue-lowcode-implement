/**
 * 注册自定义组件
 * B端全量引入使用
 */
import { line2Hump, firstLetterUpper } from '@/utils/tool'

const context = require.context(`./`, true, /index.vue$/)
const comps = context.keys().map((key) => {
  const module = context(key).default
  module.folderKey = key.toString().replace(/\/index.vue/g, '')
  module.name = line2Hump(module.folderKey.split('/').pop())
  return module
})

export default {
  install(Vue) {
    comps.forEach((compData) => {
      Vue.component(firstLetterUpper(compData.name), compData)
    })
  },
}
