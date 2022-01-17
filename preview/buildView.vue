<!-- 组装页面的预览路由 -->
<template>
  <div class="comp-blocks" v-if="pageData" :style="pageStyle">
    <component
      v-for="comp in compList"
      :key="comp.domId"
      :is="comp.name"
      :component="comp"
      :preview="false"
    ></component>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['pageData'],
  data() {
    return {}
  },

  computed: {
    compList() {
      if (!this.pageData) {
        return []
      }
      return this.pageData.compList
    },
    pageConfig() {
      return this.pageData?.pageConfig
    },
    pageStyle() {
      return Object.keys(this.pageConfig.style).reduce((origin, item) => {
        origin += `${item}:${this.pageConfig.style[item]};`
        return origin
      }, '')
    },
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.comp-blocks {
  width: 100%;
  min-height: 100vh;
}
</style>
