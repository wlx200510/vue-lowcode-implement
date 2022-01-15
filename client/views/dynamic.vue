<!--  -->
<template>
  <div class="dynamic-page" :style="pageStyle">
    <Element
      v-for="compData in compData"
      :key="compData.domId"
      :component="compData"
      :compName="compData.type"
    ></Element>
  </div>
</template>

<script>
import Element from '../components/_element.vue'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    Element,
  },
  data() {
    return {}
  },

  computed: {
    ...mapState(['pageData']),
    compData() {
      return this.$router.currentRoute.meta.config
    },
    pageConfigData() {
      return this.$router.currentRoute.meta.pageConfig
    },
    pageStyle() {
      return Object.keys(this.pageConfigData.style).reduce((origin, item) => {
        origin += `${item}:${this.pageConfigData.style[item]};`
        return origin
      }, '')
    },
  },

  methods: {},
  mounted() {
    console.log(this.$router.currentRoute)
  },
}
</script>
<style lang="scss" scoped>
.dynamic-page {
  width: 100%;
  min-height: 100vh;
}
</style>
