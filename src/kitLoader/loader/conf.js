import { autoCompletion, isValid } from '../helper'

// https://webpack.docschina.org/guides/dependency-management/#require-with-expression
// require.context 中的参数必须是字面量值

let configModules = null

function getConfigModules(context) {
  return context
    .keys()
    .map((key) => {
      const curConfigJson = context(key).default
      const kitConfig = autoCompletion(curConfigJson)

      kitConfig.folderKey = key.toString().replace(/config.js/g, '')
      return kitConfig
    })
    .filter((kitConfig) => isValid(kitConfig))
}

// 读取 config.js 设置 folderKey
export default function () {
  if (configModules) {
    return configModules
  }

  const context = require.context(`../../clientKits`, true, /config.js$/)

  configModules = [...getConfigModules(context)]

  return configModules
}
