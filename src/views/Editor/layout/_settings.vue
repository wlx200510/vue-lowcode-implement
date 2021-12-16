<script lang="jsx">
import settingControl from '@/kitLoader/backend'

export default {
  props: {
    config: { required: true, type: Object },
    name: { required: true, type: String },
    style: { required: true, type: Array },
  },

  render(h) {
    const vmOption = settingControl.getKit(this.name)

    if (!vmOptions) {
      console.error(`${this.name} comp don't find`)
      return null
    }

    const options = {
      ref: 'kitnode',
      name: this.name,
      props: Object.assign(this.config, { style: this.style }),
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
