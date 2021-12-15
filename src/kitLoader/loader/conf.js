import { autoCompletion, isValid } from '../helper'

// https://webpack.docschina.org/guides/dependency-management/#require-with-expression
// require.context 中的参数必须是字面量值

let configModules = null

function getConfigModules(context) {
  return context
    .keys()
    .map((key) => {
      const curConfigJson = context(key)
      const kitConfig = autoCompletion(curConfigJson)

      kitConfig.folderKey = key.toString().replace(/config.json/g, '')
      return kitConfig
    })
    .filter((kitConfig) => isValid(kitConfig))
}

// 读取 config.json 设置 folderKey
export default function () {
  if (configModules) {
    return configModules
  }

  const context = require.context(`../../clientKits`, true, /config.json$/)

  configModules = [...getConfigModules(context)]

  return configModules
}
