/**
 * 同步导入所有的C端组件
 */

let viewModules = null

function getViewModules(context) {
  return context.keys().map((key) => {
    const module = context(key).default

    module.folderKey = key.toString().replace(/\/index.vue/g, '')
    return module
  })
}

export default function () {
  // 读取 view.vue 设置 folderKey
  if (viewModules) {
    return viewModules
  }

  const context = require.context(`../../clientKits`, true, /index.vue$/)

  viewModules = getViewModules(context)
  // 这里只导出同步加赠的组件，异步组件不会在这里加载
  return viewModules
}
