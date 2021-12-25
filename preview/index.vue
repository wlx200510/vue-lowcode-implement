<template>
  <router-view v-if="pageConfig" :pageConfig="pageConfig.content"></router-view>
</template>

<script lang="js">
import Postmate from 'postmate'
export default {
  name: 'Child',
  data(){
    return {
      pageConfig: null,
      handShake: null,
    }
  },
  created() {
    this.handShake = new Postmate.Model({
      getData: (data) => {
        this.pageConfig = JSON.parse(data)
      }
    })
  },
  watch: {
    'pageConfig.pageConfig': function(newVal) {
      const { base } = newVal
      const pathRoute = base.router ? `/pre${base.router}` : '/'
      this.$router.replace(pathRoute)
    }
  }
}
</script>
