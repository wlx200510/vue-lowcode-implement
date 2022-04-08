<template>
  <router-view :pageData="renderData"></router-view>
</template>

<script lang="js">
import Postmate from 'postmate'
export default {
  name: 'Child',
  data(){
    return {
      renderData: null,
      handShake: null
    }
  },
  created() {
    this.handShake = new Postmate.Model({
      getData: (data) => {
        this.renderData = JSON.parse(data)
      }
    })
  },
  watch: {
    renderData: function(newVal) {
      const { pageConfig, config } = newVal
      const { base } = pageConfig
      if (config) {
        if(this.$route.path !== base.router) {
          this.$router.replace(base.router)
        }
      }
    }
  }
}
</script>
