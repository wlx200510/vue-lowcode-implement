<template>
  <router-view
    v-if="isPre && pageConfig"
    :pageConfig="pageConfig.content"
  ></router-view>
  <router-view v-else></router-view>
</template>

<script lang="js">
import Postmate from 'postmate'
export default {
  name: 'Child',
  data(){
    return {
      pageConfig: null,
      handShake: null,
      isPre: false
    }
  },
  created() {
    this.handShake = new Postmate.Model({
      getData: (data) => {
        this.pageConfig = JSON.parse(data)
        this.isPre = true
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
