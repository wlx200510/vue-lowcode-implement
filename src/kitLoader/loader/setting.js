/**
 * 同步导入所有的B端组件
 * https://webpack.docschina.org/guides/dependency-management/#require-with-expression
 * （require.context 中的参数必须是字面量值）
 */

let settingModules = null

export default function () {
  if (settingModules) {
    return settingModules
  }

  const context = require.context(`../../clientKits`, true, /setting.vue$/)
  const formModules = context.keys().map((key) => {
    const module = context(key).default
    module.folderKey = key.toString().replace(/setting.vue/g, '')
    return module
  })
  settingModules = [...formModules]

  return settingModules
}
