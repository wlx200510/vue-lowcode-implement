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
import { getPageOptionData } from '@/utils/tool'
import util from '@/utils/util.js'
import appTopbar from './layout/topbar.vue'
import AppPageSetting from './layout/pageSetting.vue'

import pageOption from '@/config/prebuild.config.js'

const pageConfig = ref(util.copyObj(pageOption))
// 不同的页面，这个settings需要不同
const settings = ref([
  {
    type: 'base-text',
    label: '页面描述',
    attr: 'desc',
    placeholder: '例：双十一专题主页',
    val: '',
    isNecessary: true,
  },
])
let handShake = null

function savePageSet() {
  console.log('save')
  localStorage.setItem(
    'GLOBAL_PRE_PAGE_DATA_SET',
    JSON.stringify({
      time: Date.now(),
      pageType: 1,
      config: getSettingData(),
      pageConfig: getPageOptionData(pageConfig.value),
    })
  )
}
function getSettingData() {
  return settings.value.reduce((origin, item) => {
    origin[item.attr] = item.val
    return origin
  }, {})
}

function syncPreview() {
  handShake.then((child) => {
    child.call(
      'getData',
      JSON.stringify({
        pageConfig: getPageOptionData(pageConfig.value),
        content: getSettingData(),
      })
    )
  })
}
onMounted(() => {
  handShake = new Postmate({
    container: document.getElementById('preIframe'),
    url: 'http://localhost:3000/preview.html',
    name: 'child-iframe',
    classListArray: ['iframe-dom'],
  })
  handShake.then((child) => {
    child.call(
      'getData',
      JSON.stringify({
        path: '/login',
        title: 'example',
        content: getSettingData(),
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
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
<style lang="css">
.iframe-con .iframe-dom {
  width: 375px;
  min-height: 800px;
  border: 1px solid gray;
  background-color: #f2f3f4;
}
</style>
