import { isArrayNoneEmpty, firstLetterUpper } from '../utils/tool'
import loadFormModules from './loader/setting'
import loadConfModules from './loader/conf'

import util from '@/utils/util'
// 用于缓存的变量
let BackendKitList = null
let CaregoryMapCache = null

class SettingKit {
  /**
   * @param {object}  config           配置文件
   * @param {obejct}  vmOptions         B端组件
   */
  constructor(config = {}, vmOptions = null) {
    /**
     * @param {string}  config.name
     * @param {string}  config.text
     * @param {string}  config.key
     * @param {string}  config.icon
     * @param {string}  config.category
     * @param {object}  config.condition
     */
    for (const key in config) {
      this[key] = config[key]
    }

    this.vm = vmOptions
  }

  instance(state = null) {
    const instance = Object.assign({})
    instance.name = this.name
    instance.text = this.text
    instance.key = this.key
    instance.condition = this.condition
    instance.category = this.category

    instance.vm = Object.assign({}, this.vm)
    // 看是否要做store的储存隔离
    return instance
  }
}

function loadSettingKitList() {
  if (isArrayNoneEmpty(BackendKitList)) {
    return BackendKitList
  }

  BackendKitList = []

  const configs = loadConfModules()
  const templates = loadFormModules()

  for (const config of configs) {
    const { folderKey } = config
    config.name = firstLetterUpper(config.name)
    const vm = templates.find((it) => it.folderKey === folderKey)
    if (vm) {
      BackendKitList.push(new SettingKit(config, vm))
    } else {
      // 表示对应的组件没有setting.vue配置项
      console.warn(`[kit.backend.controller] cannot match ${folderKey}`)
    }
  }

  return BackendKitList
}

export default {
  getKit(name = '') {
    const list = loadSettingKitList()
    const kit = list.find((it) => it.name === name)
    return kit || null
  },

  getVM(name = '') {
    const list = loadSettingKitList()
    const kit = list.find((it) => it.name === name)
    return kit ? kit.vm : null
  },

  getKitCategory(ownere = '*', backendConfig) {
    // @todo
    // 有缓存
    if (CaregoryMapCache && CaregoryMapCache[owner]) {
      return CaregoryMapCache[owner]
    }

    if (!CaregoryMapCache) {
      CaregoryMapCache = {}
    }
    if (!CaregoryMapCache[owner]) {
      CaregoryMapCache[owner] = []
    }
  },
}
