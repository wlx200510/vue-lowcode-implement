<!-- record -->
<template>
  <div class="record">
    <h2 :style="{ color: pageConfig.color }">奖品列表</h2>
    <p>{{ pageConfig.desc }}</p>
  </div>
</template>

<script>
export default {
  name: 'record',
  data() {
    return {}
  },
  props: ['pageConfig'],

  computed: {},

  methods: {},
}
</script>
<style lang="scss" scoped></style>
