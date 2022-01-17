/**
 * 演示有Vue组件调用的插件
 * 这个插件用于动态生成组件并插入当前页面
 * 注意init方法和active方法的定义
 */
import RuleDialog from './ruleDialog.vue'

// 定义本模块的模块级别全局变量
let t = null,
  C = null,
  container = null,
  compData = null

function init(Vue, props) {
  C = Vue.extend(RuleDialog)
  container = document.createElement('div')
  compData = props
}

function active() {
  t = new C({
    el: container,
    data() {
      if (typeof compData !== 'object') {
        return {
          data: [],
        }
      }
      return {
        ...compData,
      }
    },
    methods: {
      removeLock() {
        document.documentElement.classList.remove('lock')
        document.body.classList.remove('lock')
      },
      closeRule() {
        t.$el.remove()
        this.removeLock()
        t = null
      },
    },
    destroyed() {
      this.removeLock()
    },
  })
  console.log(t)
  document.body.appendChild(t.$el)
}

export default {
  init,
  active,
}
