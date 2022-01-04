import { isValid } from '../helper'

// https://webpack.docschina.org/guides/dependency-management/#require-with-expression
// require.context 中的参数必须是字面量值

let pluginModules = null

function getPluginConfigModules(context) {
  return context.keys().map((key) => {
    const curConfigJson = context(key)
    console.log(curConfigJson)
    curConfigJson.folderKey = key.toString().replace(/config.json/g, '')
    return curConfigJson
  })
}

// 读取 config.json 设置 folderKey
export default function () {
  if (pluginModules) {
    return pluginModules
  }

  const context = require.context(`../../dynamicPlugin`, true, /config.json$/)

  pluginModules = getPluginConfigModules(context)

  return pluginModules
}
