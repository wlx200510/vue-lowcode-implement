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
import { useRouter } from 'vue2-helpers/vue-router'
import { getPageOptionData, setPageOptionData } from '@/utils/tool'
import util from '@/utils/util.js'
import appTopbar from './layout/topbar.vue'
import AppPageSetting from './layout/pageSetting.vue'

import pageOption from '@/config/prebuild.config.js'
import baseData from '@d' // 数据源

let projectDataVal = null,
  pageDataVal = null
const pageConfig = ref(util.copyObj(pageOption))
// 不同的页面，这个settings需要不同
const settings = ref([])
const router = useRouter()
const routeData = router.currentRoute
let handShake = null

function setLocalPageData() {
  // routeData.params.id routeData.params.pageId
  projectDataVal = baseData.find(
    (item) => item.id === Number(routeData.params.id)
  )
  pageDataVal = projectDataVal.pages.find(
    (item) => item.pageId === Number(routeData.params.pageId)
  )
  pageConfig.value = setPrePageOption(pageDataVal?.pageConfig, pageConfig.value)
  settings.value = pageDataVal.prePageData.settings
}

function setPrePageOption(config, formData) {
  if (config) {
    return setPageOptionData(config, formData)
  } else {
    return setPageOptionData(
      {
        base: {
          name: pageDataVal.prePageData.name,
          router: `/pre/${pageDataVal.prePageData.router}`,
          position: `/src/prePages/${pageDataVal.prePageData.name}/index.vue`,
        },
      },
      formData
    )
  }
}

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
  setLocalPageData()
})

onMounted(() => {
  handShake = new Postmate({
    container: document.getElementById('preIframe'),
    url: 'http://localhost:3000/preview.html',
    name: 'child-iframe',
    classListArray: ['iframe-dom'],
  })
  handShake.then((child) => {
    const pageData = getPageOptionData(pageConfig.value)
    child.call(
      'getData',
      JSON.stringify({
        path: `/${pageData.router}`,
        title: pageData.name,
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
