<template>
  <router-view :pageData="data"></router-view>
</template>

<script lang="js">
import Postmate from 'postmate'
export default {
  name: 'Child',
  data(){
    return {
      data: null,
      handShake: null
    }
  },
  created() {
    this.handShake = new Postmate.Model({
      getData: (data) => {
        this.data = JSON.parse(data)
      }
    })
  },
  watch: {
    'data': function(newVal) {
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
