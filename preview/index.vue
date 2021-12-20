<template>
  <router-view :pageConfig="pageConfig"></router-view>
</template>

<script lang="js">
import Postmate from 'postmate'
export default {
  name: 'Child',
  data(){
    return {
      pageConfig: {},
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
    'pageConfig.path': function(newVal) {
      this.$router.replace(newVal || '/')
    }
  }
}
</script>
