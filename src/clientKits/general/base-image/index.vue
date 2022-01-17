<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
    @click="triggerClick"
  >
    <div class="image-box">
      <img v-if="imgUrl" :src="imgUrl" />
      <div v-else class="image-placeholder"><i class="fa fa-image"></i></div>
    </div>
  </div>
</template>

<script>
import Utils from '@/utils/util'
export default {
  name: 'BaseImage',
  props: {
    component: {
      type: Object,
    },
    preview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imgUrl: this.component.style[1].val,
    }
  },
  computed: {
    getStyle() {
      const ret = []
      this.component.style.forEach((item) => {
        const unit = item.unit || ''
        item.val && ret.push(item.attr + ':' + item.val + unit)
      })
      return ret.join(';')
    },
  },
  watch: {
    component: {
      handler() {
        this.imgUrl = this.component.style[1].val
      },
      deep: true,
    },
  },
  methods: {
    triggerClick(e) {
      const clickSettingData = this.component.settings.config[0]
      // 判断点击是否在配置的区域里面
      if (!this.preview) {
        const isXClick =
          e.offsetX > clickSettingData.x &&
          e.offsetX < clickSettingData.w + clickSettingData.x
        const isYClick =
          e.offsetY > clickSettingData.y &&
          e.offsetY < clickSettingData.y + clickSettingData.h
        if (isXClick && isYClick) {
          Utils.parseClickConfig(clickSettingData.click, this)
        }
      }
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.image-box {
  position: relative;
  overflow: hidden;

  .image-placeholder {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;

    > .fa {
      color: #83c0ff;
      font-size: 40px;
    }
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    margin: 0;
    border: 0;
    -webkit-user-drag: none;
  }
}
</style>
