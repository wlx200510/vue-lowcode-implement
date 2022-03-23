<!-- record -->
<template>
  <div class="record">
    <h2 :style="{ color: fontColor }">奖品列表</h2>
    <p>{{ pageData.config.desc }}</p>
  </div>
</template>

<script>
export default {
  name: 'record',
  data() {
    return {}
  },
  props: ['pageData'],

  computed: {
    fontColor() {
      return this.pageData.config.color
    },
  },

  methods: {},
}
</script>
<style lang="scss" scoped></style>
