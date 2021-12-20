<template>
  <div class="app-body">
    <div class="app-main">
      <appTopbar
        v-on:savePageSet="savePageSet"
        v-on:syncPreview="syncPreview"
      ></appTopbar>
      <div class="iframe-con" id="preIframe"></div>
    </div>
    <AppPageSetting :option="pageConfig" :settings="settings"></AppPageSetting>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
} from '@vue/composition-api'
import Postmate from 'postmate'
import util from '@/utils/util.js'
import appTopbar from './layout/topbar.vue'
import AppPageSetting from './layout/pageSetting.vue'

import pageOption from '@/config/prebuild.config.js'

const pageConfig = reactive(util.copyObj(pageOption))

const settings = ref([])
let handShake = null
onMounted(() => {
  handShake = new Postmate({
    container: document.getElementById('preIframe'),
    url: './preview.html',
    name: 'child-iframe',
    classListArray: ['iframe-dom'],
  })
  handShake.then((child) => {
    child.call(
      'getData',
      JSON.stringify({
        path: '/temp',
        title: 'example',
        content: {},
      })
    )
  })
})
</script>

<style lang="scss" scoped>
.app-body {
  display: flex;
  position: absolute;
  top: 60px;
  bottom: 0;
  width: 100%;

  .app-main {
    position: relative;
    flex: 1;
    min-width: 800px;
    background-color: #f2f3f4;

    .iframe-con {
      position: absolute;
      top: 40px;
      bottom: 0;
      width: 100%;
      padding-top: 30px;
      padding-bottom: 30px;
      .iframe-dom {
        width: 375px;
        background-color: #f2f3f4;
      }
    }
  }
}
</style>
