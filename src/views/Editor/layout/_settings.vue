<script lang="jsx">
import settingControl from '@/kitLoader/backend'

export default {
  props: {
    base: { required: false, type: Array },
    settings: { required: true, type: Object },
    name: { required: true, type: String },
    styleArr: { required: true, type: Array },
  },

  render(h) {
    if (this.settings.base) {
      console.warn('base props will replace origin base props array')
    }
    const vmOption = settingControl.getVM(this.name)

    if (!vmOption) {
      console.error(`${this.name} comp don't find`)
      return null
    }

    const options = {
      ref: 'kitnode',
      name: this.name,
      props: {
        styleArr: this.styleArr,
        base: this.base,
        ...this.settings,
      },
      on: this.$listeners,
    }
    // B端组件同步加载即可
    return h(vmOption, options)
  },

  errorCaptured(error, vm, info) {
    console.warn(`error in errorCaptured with vm:`)
    console.warn(vm)
    console.error(error)
  },
}
</script>
