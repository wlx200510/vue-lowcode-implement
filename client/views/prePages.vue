<!--  -->
<template>
  <router-view :pageData="pageData"></router-view>
</template>

<script>
/**
 * 预制页面默认引入了pageData作为属性，用于预览页面
 * 为了桥接这一层，故设置了这个组件
 */
export default {
  name: 'prePages',
  computed: {
    pageData() {
      return this.$router.currentRoute.meta
    },
  },
}
</script>
<style lang="scss" scoped></style>
