import loadViewModules from './loader/view'
import loadConfModules from './loader/conf'
import { isArrayNoneEmpty, line2Hump } from '@/utils/tool'
let seed = 0
let ClientKitList = null

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

// 以【folderKey】作为标记关联 config.json & view.vue
function loadClientKitList() {
  if (isArrayNoneEmpty(ClientKitList)) {
    return ClientKitList
  }

  ClientKitList = [] //只保存同步组件

  const templates = loadViewModules()
  const compConfigs = loadConfModules()

  console.log(compConfigs)

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
