<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div
      class="swiper-container"
      :id="component.domId"
      :style="{ width: width, height: height }"
    >
      <div class="swiper-wrapper">
        <div
          v-for="banner in banners"
          class="swiper-slide"
          @click="triggerClick(banner)"
        >
          <img v-if="banner.val" :src="banner.val" />
          <div v-else class="image-placeholder">
            <i class="fa fa-caret-square-o-right"></i>
          </div>
        </div>
      </div>
      <div v-show="pagination" class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import Utils from '@/utils/util'

export default {
  name: 'SwiperBanner',
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
      swiper: null,
      banners: this.component.settings.config,
      autoplay: this.component.base[0].val,
      pagination: this.component.base[1].val,
      height: this.getMaxHeight(),
      width: this.getWidth(),
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
        this.banners = this.component.settings.config
        this.autoplay = this.component.base[0].val
        this.pagination = this.component.base[1].val
        this.height = this.getMaxHeight()
        this.width = this.getWidth()
        setTimeout(() => {
          this.swiper.update()
        }, 0)
      },
      deep: true,
    },
    autoplay: function (newVal) {
      newVal ? this.swiper.autoplay.start() : this.swiper.autoplay.stop()
    },
  },
  methods: {
    triggerClick(data) {
      if (!this.preview) {
        Utils.parseClickConfig(data.click, this)
      }
    },
    getMaxHeight() {
      let h = 0
      if (
        this.component.settings.config &&
        this.component.settings.config.length
      ) {
        this.component.settings.config.forEach((item) => {
          if (item.height && item.height > h) {
            h = item.height
          }
        })
      }
      return h > 0 ? h / 2 + 'px' : '112px'
    },
    getWidth() {
      return (
        (750 - this.component.style[2].val - this.component.style[4].val) / 2 +
        'px'
      )
    },
  },
  mounted() {
    this.swiper = new Swiper('#' + this.component.domId, {
      autoplay: this.autoplay,
      pagination: {
        el: '.swiper-pagination',
      },
    })
  },
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;

  .swiper-slide {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
      width: 100%;
      height: auto;
    }
  }
}

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
</style>
