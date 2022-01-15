<script lang="js">
import { line2Hump } from "../../src/utils/tool"
const files = require.context('../../src/clientKits', true, /index$/, 'lazy')
const dynamicComps = {}
let allKeys = [] // 储存所有的异步组件名称
files.keys().forEach((key) => {
  const pathName = key.slice(2, -6) // 两段
  const name = pathName.split('/')[1]
  if (name) {
    allKeys.push(name)
    dynamicComps[line2Hump(name)] = () =>
      import(/* webpackChunkName: "[request]" */ `../../src/clientKits/${pathName}/index`)
  }
})
export default {
  components: dynamicComps,
  props: {
    compName: {
      required: true,
      type: String,
      default: ''
    },
    component: {
      required: false,
      type: Object,
    }
  },
  computed: {
    currentAsyncComp: function () {
      return line2Hump(this.compName)
    }
  },
  render(h) {
    if (allKeys.indexOf(this.compName) < 0) {
      // 如果异步组件里面也不存在此组件，则返回注释节点
      const notes = h('')
      notes.text = `name ${this.compName} is not found`
      return notes
    }
    return h(this.currentAsyncComp, {
      ref: 'asynckitnode',
      name: this.compName,
      props: { component: this.component, preview: false },
      id: this.component.domId,
      on: this.$listeners
    })
  }
}
</script>
