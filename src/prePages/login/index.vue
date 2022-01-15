<!-- login -->
<template>
  <div class="login">
    <p>登录页面</p>
    <p>{{ pageData.config.desc }}</p>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {}
  },
  props: ['pageData'],

  computed: {},

  methods: {},
}
</script>
<style lang="scss" scoped></style>
