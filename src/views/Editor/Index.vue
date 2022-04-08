<template>
  <div class="app-body">
    <appSidebar :source="projectDataVal"></appSidebar>
    <div class="app-main">
      <appToolbar
        v-on:showPageSet="showPageSet"
        v-on:savePageSet="savePageSet"
        v-on:showPreview="showPreview"
      ></appToolbar>
      <div class="scroll-y">
        <div
          class="app-phone"
          @dragover.self="dragPhoneOver"
          @dragleave.self="dragPhoneLeave"
          @drop.self="dropPhone"
          @dragover.prevent
        >
          <!--占位提示控件-->
          <div
            class="place-holder"
            @dragover.stop="dragover"
            @dragleave.stop="dragleave"
            @drop.stop="drop"
            @dragover.prevent
          >
            放在这里
          </div>

          <template v-for="(comp, idx) in compList">
            <div
              :class="['tpl-container', comp.active ? 'current' : '']"
              :data-index="idx"
              @click.capture="clickComp"
            >
              <component
                :is="comp.name"
                :component="comp"
                :preview="true"
              ></component>
              <!--控件操作-->
              <div class="comp-menu">
                <a
                  v-if="!comp.fixed"
                  href="javascript:void(0)"
                  :class="[idx == 0 ? 'disabled' : '']"
                  @click="upComp(idx)"
                >
                  <span class="tips">上移</span>
                  <i class="fa fa-arrow-circle-up"></i>
                </a>
                <a
                  v-if="!comp.fixed"
                  href="javascript:void(0)"
                  :class="[canShowDown(idx) ? '' : 'disabled']"
                  @click="downComp(idx)"
                >
                  <span class="tips">下移</span>
                  <i class="fa fa-arrow-circle-down"></i>
                </a>
                <a href="javascript:void(0)" @click="delComp(idx)">
                  <span class="tips">删除</span>
                  <i class="fa fa-trash"></i>
                </a>
              </div>
            </div>

            <div
              class="place-holder"
              @dragover.stop="dragover"
              @dragleave.stop="dragleave"
              @drop.stop="drop"
              @dragover.prevent
              :data-index="idx"
            >
              放在这里
            </div>
          </template>
        </div>
      </div>
    </div>

    <previewDialog
      v-if="previewShow"
      :pageConfig="pageConfig"
      :comp="compList"
      @close="previewShow = false"
    ></previewDialog>

    <appOpt v-if="currentConfig" :option="currentConfig"></appOpt>
    <appPageOpt v-else :option="pageConfig"></appPageOpt>

    <clickConfig
      v-if="clickShow"
      :option="currentConfig"
      :comps="compList"
      :index="click.index"
      :tabs="click.tabs"
      @close="clickShow = false"
    ></clickConfig>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  getCurrentInstance,
  watch,
  computed,
  watchEffect,
  onMounted,
} from '@vue/composition-api'
import { useRouter } from 'vue2-helpers/vue-router'
import util from '@/utils/util.js'
import {
  line2Hump,
  firstLetterUpper,
  getPageOptionData,
  setPageOptionData,
} from '@/utils/tool'
import appSidebar from './layout/sidebar.vue'
import appToolbar from './layout/toolbar.vue'
import appOpt from './layout/option.vue'
import appPageOpt from './layout/pageOption.vue'

import clickConfig from '@/components/clickConfig.vue'
import previewDialog from '@/components/preview.vue'
// 页面默认配置更改此配置可以更改页面配置
import pageOption from '@/config/page.config.js'
// 组件默认配置
import { getAllClientSchema } from '@/kitLoader/client.js'

const { $bus, $confirm, $message, $store } = getCurrentInstance().proxy
const clickShow = ref(false),
  previewShow = ref(false),
  compList = ref([]),
  bottomMenu = ref(null),
  currentIndex = ref(-1),
  currentConfig = ref(null)
const router = useRouter()
const routeData = router.currentRoute
let projectDataVal = null,
  pageDataVal = null,
  pageDataIndex = 0

let pageConfig = ref(util.copyObj(pageOption))
let click = reactive({
  index: 0,
  tabs: [],
})
const compConfig = getAllClientSchema()

const hasFixedComp = computed(() => compList.value.some((item) => item.fixed))

function canShowDown(index) {
  const totleCompListLength = compList.value.length
  if (index === totleCompListLength - 1) {
    return false
  }
  if (
    index === totleCompListLength - 2 &&
    compList.value[totleCompListLength - 1].fixed
  ) {
    return false
  }
  return true
}

function addComp(index, key) {
  const comp = util.copyObj(compConfig[key])
  const config = {
    type: key,
    name: firstLetterUpper(line2Hump(key)),
    active: true,
    domId: key + '-' + util.createDomID(),
  }
  Object.assign(comp, config)
  insertCompAndSelect(comp, index)
}
// 拖动放置底部导航的组件，这个单独处理的，感觉可以当成一般组件来处理，@todo待优化
function addBottomMenu(index, key) {
  const comp = util.copyObj(compConfig[key])
  const config = {
    type: key,
    name: firstLetterUpper(line2Hump(key)),
    active: true,
    domId: key + '-' + util.createDomID(),
    fixed: true,
  }
  Object.assign(comp, config)
  insertCompAndSelect(comp, index)
}
function insertCompAndSelect(compData, index) {
  // 把fixed为true的放在最后
  // fixed为true的只能有一个元素 ———— 需要保证
  if (compData.fixed) {
    compList.value.push(compData)
    currentIndex.value = compList.value.length + 1
  } else {
    if (hasFixedComp.value && index === compList.value.length) {
      compList.value.splice(index - 1, 0, compData)
      currentIndex.value = index
    } else {
      compList.value.splice(index, 0, compData)
      currentIndex.value = index + 1
    }
    // 显示配置项
  }
  currentConfig.value = compData
}
function clickComp(e) {
  if (bottomMenu.value) bottomMenu.value.active = false
  const idx = parseInt(e.currentTarget.dataset.index)
  compList.value.forEach((val, index) => {
    if (index === idx) {
      val.active = true
      currentIndex.value = index
      currentConfig.value = val
    } else {
      val.active = false
    }
  })
}
function upComp(idx) {
  if (idx < 1) return false
  // 复制当前控件
  const tmp = util.copyObj(compList.value[idx])
  // 再删除控件+占位坑
  compList.value.splice(idx, 1)
  // 再插入控件
  compList.value.splice(idx - 1, 0, tmp)
  // 显示当前组件配置
  currentIndex.value = idx - 1
  currentConfig.value = compList.value[idx - 1]
}
function downComp(idx) {
  if (!canShowDown(idx)) {
    return false
  }
  // 复制当前控件
  const tmp = util.copyObj(compList.value[idx])
  // 再删除控件
  compList.value.splice(idx, 1)
  // 再插入控件
  compList.value.splice(idx + 1, 0, tmp)
  // 显示当前组件配置
  currentIndex.value = idx + 1
  currentConfig.value = compList.value[idx + 1]
}
function delComp(idx) {
  // 删除控件
  compList.value.splice(idx, 1)
  // 显示页面配置参数
  showPageSet()
}
// 拖动相关
function dragover(e) {
  const target = e.target
  if (!target.classList.contains('active')) target.classList.add('active')
}
function drop(e) {
  const target = e.target
  target.classList.remove('active')
  const key = e.dataTransfer.getData('cmp-type')
  const idx = parseInt(target.dataset.index || -1) + 1
  if (compConfig[key]) {
    // 这里针对只能放置一个的组件处理，可以通过属性来搞
    if (key === 'bottom-menu') {
      if (hasFixedComp.value) {
        $message.info('已经存在一个底部导航组件了，请勿重复添加！')
      } else {
        resetCompUnchecked()
        addBottomMenu(idx, key)
      }
    } else {
      resetCompUnchecked()
      addComp(idx, key)
    }
  } else {
    $message.warning('没有查询到该组件的配置信息。。。')
  }
}
function dragleave(e) {
  e.target.classList.remove('active')
}
// 拖动后放置相关逻辑
function dropPhone(e) {
  const target = e.target.querySelector('.place-holder:last-child')
  if (target) {
    target.classList.remove('active')
    const key = e.dataTransfer.getData('cmp-type')
    const idx = parseInt(target.dataset.index || -1) + 1
    if (compConfig[key]) {
      // 这里针对只能放置一个的组件处理，可以通过属性来搞
      if (key === 'bottom-menu') {
        if (hasFixedComp.value) {
          $message.info('已经存在一个底部导航组件了，请勿重复添加！')
        } else {
          resetCompUnchecked()
          addBottomMenu(idx, key)
        }
      } else {
        resetCompUnchecked()
        addComp(idx, key)
      }
    } else {
      $message.warning('没有查询到该组件的配置信息。。。')
    }
  }
}
function dragPhoneLeave() {
  const target = document.querySelector('.place-holder:last-child')
  target && target.classList.remove('active')
}
function dragPhoneOver() {
  const target = document.querySelector('.place-holder:last-child')
  if (target && !target.classList.contains('active'))
    target.classList.add('active')
}

onMounted(() => {
  $bus.$on('click:show', (idx, tabs) => {
    click.index = idx
    if (Array.isArray(tabs) && tabs.length) {
      click.tabs = tabs
    } else {
      click.tabs = ['outside', 'code', 'logic', 'page']
    }
    clickShow.value = true
  })
  $bus.$on('click:submit', (idx, config) => {
    if (idx > -1) {
      compList.value[currentIndex.value].settings.config[idx].click = config
    }
  })
})
function showPageSet() {
  resetCompUnchecked()
  currentIndex.value = -1
  currentConfig.value = null
}
function savePageSet() {
  projectDataVal.renderData.pages[pageDataIndex] = {
    ...projectDataVal.renderData.pages[pageDataIndex],
    config: compList.value,
    pageConfig: getPageOptionData(pageConfig.value),
  }
  $store.dispatch('updateOldProject', projectDataVal).then(() => {
    $message({
      message: '保存成功',
      type: 'success',
    })
    router.back()
  })
}
function showPreview() {
  localStorage.setItem(
    'GLOBAL_PAGE_DATA_SET',
    JSON.stringify({
      time: Date.now(),
      config: compList.value,
      pageConfig: getPageOptionData(pageConfig.value),
      pageType: 0,
      pageId: pageDataVal.pageId,
    })
  )
  previewShow.value = true
}
function resetCompUnchecked() {
  compList.value.forEach((val) => {
    if (val.active) {
      val.active = false
    }
  })
}
function setLocalPageData() {
  // routeData.params.id routeData.params.pageId
  projectDataVal = $store.state.projects.find(
    (item) => item.id === Number(routeData.params.id)
  )
  pageDataIndex = projectDataVal.renderData.pages.findIndex(
    (item) => item.pageId === Number(routeData.params.pageId)
  )

  pageDataVal = projectDataVal.renderData.pages[pageDataIndex]
  if (pageDataVal?.config) {
    compList.value = pageDataVal.config
  }
  if (pageDataVal?.pageConfig) {
    pageConfig.value = setPageOptionData(
      pageDataVal.pageConfig,
      pageConfig.value
    )
  }
}
function readLocalData() {
  const tmp = localStorage.getItem('GLOBAL_PAGE_DATA_SET')
  if (tmp) {
    const localData = JSON.parse(tmp)
    const t = util.parseTime(localData.time)
    $confirm(
      '您有一份【' + t + '】未保存的编辑内容, 是否恢复到当前编辑界面？',
      '提示',
      {
        confirmButtonText: '载入',
        cancelButtonText: '丢弃',
        type: 'warning',
        center: true,
      }
    )
      .then(() => {
        compList.value = localData.config
        // 此处需要用还原函数
        pageConfig.value = setPageOptionData(
          localData.pageConfig,
          pageConfig.value
        )
        resetCompUnchecked()
      })
      .catch((e) => {
        console.log(e)
        localStorage.setItem('GLOBAL_PAGE_DATA_SET', '')
      })
  }
}
onMounted(() => {
  setLocalPageData()
  showPageSet()
})
</script>
<script>
export default {
  name: 'AppMain',
}
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
    min-width: 377px;
    background-color: #f2f3f4;

    .scroll-y {
      position: absolute;
      top: 40px;
      bottom: 0;
      width: 100%;
      padding-top: 30px;
      padding-bottom: 30px;
      overflow-y: auto;
    }

    .app-phone {
      position: relative;
      box-sizing: border-box;
      width: 377px;
      min-height: 667px;
      padding-bottom: 200px;
      margin: 0 auto;
      background-color: #fff;
      transform: translateX(-20px);
      contain: 'strict';

      .place-holder {
        position: relative;
        display: block;
        height: 10px;
        text-align: center;
        font-size: 0;
        background: #fff;
        background-image: linear-gradient(#fff 2px, transparent 0),
          linear-gradient(90deg, #999 1px, transparent 0);
        background-size: 3px 3px, 3px 3px;

        &.active {
          height: 40px;
          line-height: 40px;
          border: 1px dashed #f32e37;
          background-color: #ffe800;
          background-image: none;
          color: #333;
          font-size: 14px;
          margin: 0;
        }
      }

      .tpl-container {
        position: relative;
        width: 100%;
        background-color: transparent;
        position: relative;
        border: 1px solid #f2f3f4;
        transition: opacity 0.1s ease-out;
        user-select: none;
        box-sizing: border-box;
        z-index: auto;
        opacity: 1;
        cursor: pointer;

        &.current {
          border: 1px solid #2aa7ff;

          .comp-menu {
            display: block;
          }
        }

        .comp-content {
          position: relative;
        }
      }
    }

    .comp-menu {
      position: absolute;
      display: none;
      top: 0;
      right: -38px;
      width: 32px;

      > a {
        display: inline-block;
        position: relative;
        width: 36px;
        height: 36px;
        margin-bottom: 2px;
        text-align: center;
        color: #666;
        background: #fff;
        font-size: 18px;
        line-height: 36px;

        &.disabled {
          color: #e4e4e4;
        }

        &:hover {
          &.disabled {
            color: #e4e4e4;
          }
          color: #333;
          .tips {
            display: block;
          }
        }

        .tips {
          font-size: 12px;
          position: absolute;
          left: 120%;
          background-color: #111;
          height: 18px;
          padding: 0 5px;
          line-height: 19px;
          border-radius: 2px;
          white-space: nowrap;
          display: none;
          color: #eee;
          top: 5px;

          &::before {
            content: ' ';
            display: block;
            position: absolute;
            left: -5px;
            top: 4.5px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 5px 6px 5px 0;
            border-color: transparent #111 transparent transparent;
          }
        }
      }
    }

    .absolute-tpl {
      width: 377px;
      margin: 0 auto;
      transform: translateX(-20px);
      border-top: 1px solid #e8e8e8;

      &.current {
        border: 1px solid #2aa7ff;

        .comp-menu {
          display: block;
        }
      }
    }
  }
}
</style>
