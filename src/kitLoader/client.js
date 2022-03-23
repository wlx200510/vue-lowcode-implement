import loadViewModules from './loader/view'
import loadConfModules from './loader/conf'
import { isArrayNoneEmpty, line2Hump } from '@/utils/tool'
import util from '@/utils/util.js'
let seed = 0
let ClientKitList = null
let allDefaultSchema = null

/**
 * @param {object} config       配置文件
 * @param {string} config.name  组件名称
 * @param {obejct} vmOptions    C端组件
 */

class ClientKit {
  constructor(config = {}, vmOptions = null) {
    const { name } = config

    this.name = name
    this.vm = vmOptions
    this.vm.name = name
    this.vm.kit_id = seed + Date.now()
    this.vm.kit_name = name
    seed++
  }
}

// 以【folderKey】作为标记关联 config.js & view.vue
function loadClientKitList() {
  if (isArrayNoneEmpty(ClientKitList)) {
    return ClientKitList
  }

  ClientKitList = [] //只保存同步组件

  const templates = loadViewModules()
  const compConfigs = loadConfModules()

  for (const conf of compConfigs) {
    const { folderKey } = conf
    const vm = templates.find((it) => it.folderKey === folderKey)

    if (vm) {
      ClientKitList.push(new ClientKit(conf, vm))
    } else {
      console.warn(`[kit.client.controller] cannot match ${folderKey}`)
    }
  }

  return ClientKitList
}

export function getAllClientSchema() {
  if (allDefaultSchema) {
    return allDefaultSchema
  }
  const compConfigs = loadConfModules()

  const result = compConfigs.reduce((origin, item) => {
    origin[item.key] = util.copyObj(item.default)
    return origin
  }, {})
  allDefaultSchema = result
  return result
}

export default {
  getKit(name = '') {
    const list = loadClientKitList()
    const kit = list.find((it) => it.name === name)
    return kit || null
  },

  getVM(name = '') {
    const list = loadClientKitList()
    const kit = list.find((it) => it.name === name)
    return kit ? kit.vm : null
  },
}
