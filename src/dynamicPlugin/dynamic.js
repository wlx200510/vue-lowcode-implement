/**
 * @name
 * @path
 * @props
 * @env
 * 每个默认导出的插件需要有以下两个方法
 * @@init
 * @@show
 */
class DynamicLoader {
  constructor(plugins = []) {
    this.$plugins = plugins
    this.registerPlugins()
  }

  registerPlugins() {
    this.$plugins.forEach((item) => {
      import('@/dynamicPlugin/' + item.path).then((data) => {
        data.default.init(item.props)
        item.main = data.default
      })
    })
  }

  examinePlugin(plugin) {
    return plugin.name && plugin.path && plugin.props
  }
  isPluginExist(plugin) {
    const pluginData = this.$plugins.find((item) => item.name === plugin.name)
    if (pluginData) {
      return true
    }
    return false
  }

  delPlugin(name) {
    if (isPluginExist(plugin)) {
      const pluginIndex = this.$plugins.findIndex((item) => item.name === name)
      if (this.$plugins[pluginIndex].destory) {
        this.$plugins[pluginIndex].destory()
      }
      this.$plugins.splice(pluginIndex, 1)
    }
  }

  addPlugin(plugin) {
    if (this.examinePlugin(plugin)) {
      if (!this.isPluginExist(plugin)) {
        return import('@/dynamicPlugin/' + plugin.path).then((data) => {
          data.default.init(plugin.props)
          plugin.main = data.default
          this.$plugins.push(plugin)
          return plugin
        })
      } else {
        return Promise.reject('already')
      }
    } else {
      console.error('插件数据不完整，请检查')
      return Promise.reject('error')
    }
  }

  callPlugin(name) {
    const plugin = this.$plugins.find((item) => item.name === name)
    if (!plugin) {
      console.error('调用的插件未在系统注册')
    } else {
      plugin.main.show()
    }
  }
}

export default DynamicLoader
