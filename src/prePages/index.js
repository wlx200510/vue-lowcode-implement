/**
 * 注册预制页面组件
 * B端全量引入使用
 */

const context = require.context(`./`, true, /index.vue$/)
const contextSetting = require.context(`./`, true, /settings.js$/)
const pages = context.keys().map((key) => {
  const module = context(key).default
  module.folderKey = key.toString().replace(/\/index.vue/g, '')
  module.router = module.folderKey.split('/').pop()
  return module
})
const pageSettings = contextSetting.keys().map((key) => {
  const settings = contextSetting(key).default
  settings.folderKey = key.toString().replace(/\/settings.js/g, '')
  return settings
})

const prePageArr = pages.map((item) => {
  const settingPage = pageSettings.find(
    (data) => data.folderKey === item.folderKey
  )
  return {
    name: settingPage.name,
    projectTypes: settingPage.projectTypes,
    settings: settingPage.settings,
    router: item.router,
    folderKey: item.folderKey,
  }
})

function getUseablePrePages(typeName) {
  return prePageArr.filter((item) => {
    if (!item.projectTypes || item.projectTypes.length === 0) {
      // 说明是公共可用的预制页面
      return true
    }
    return item.projectTypes.includes(typeName)
  })
}

export default getUseablePrePages
