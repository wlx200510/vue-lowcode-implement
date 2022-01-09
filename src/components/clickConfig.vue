<template>
  <el-dialog
    id="click"
    title="点击配置"
    :close-on-click-modal="false"
    :append-to-body="false"
    :visible.sync="dialogShow"
    @close="emit('close')"
    width="680px"
  >
    <el-tabs v-model="currentTab" type="card" @tab-click="clickTab">
      <el-tab-pane
        v-if="tabs.indexOf('outside') > -1"
        label="链接地址"
        name="outside"
      >
        <el-form label-width="100px" style="margin-top: 20px">
          <el-form-item label="链接地址：">
            <el-input
              placeholder="请输入链接地址，例：https://www.example.com/"
              v-model="outsideVal"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane
        v-if="tabs.indexOf('logic') > -1"
        label="页面功能"
        name="logic"
      >
        <el-form label-width="120px" style="margin-top: 20px">
          <el-form-item label="功能类型：">
            <el-radio-group v-model="logicVal.type">
              <el-radio label="Router">Hash路由跳转</el-radio>
              <el-radio label="Store">Store方法</el-radio>
              <el-radio label="Plugin">插件方法</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="跳转Schema：">
            <el-input
              placeholder="请输入Schema内容，格式为: ${调用方法}?${params}"
              v-model="logicVal.content"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane
        v-if="tabs.indexOf('code') > -1"
        label="自定义脚本"
        name="jsCode"
      >
        <el-form label-width="100px" style="margin-top: 20px">
          <el-form-item label="自定义脚本：">
            <el-input
              type="textarea"
              placeholder="javascript代码，例：location.href='https://www.baidu.com'"
              v-model="codeVal"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane
        v-if="tabs.indexOf('page') > -1"
        label="页内位置"
        name="page"
      >
        <el-tabs tab-position="left">
          <el-tab-pane label="全部">
            <div class="choose-panel">
              <template v-for="comp in comps">
                <el-button
                  v-if="comp.type !== 'placeholder'"
                  size="mini"
                  round
                  :class="[
                    currentTab === 'page' && pageVal === comp.domId
                      ? 'el-button--primary'
                      : '',
                  ]"
                  :key="comp.domId"
                  @click="setPageAction(comp.domId)"
                >
                  {{ comp.domName || comp.domId }}
                </el-button>
              </template>
            </div>
          </el-tab-pane>
          <el-tab-pane label="图片">
            <div class="choose-panel">
              <template v-for="comp in comps">
                <el-button
                  v-if="comp.type == 'base-img'"
                  size="mini"
                  round
                  :class="[
                    currentTab == 'page' && pageVal === comp.domId
                      ? 'el-button--primary'
                      : '',
                  ]"
                  :key="comp.domId"
                  @click="setPageAction(comp.domId)"
                >
                  {{ comp.domName || comp.domId }}
                </el-button>
              </template>
            </div>
          </el-tab-pane>
          <el-tab-pane label="文本">
            <div class="choose-panel">
              <template v-for="comp in comps">
                <el-button
                  v-if="comp.type == 'base-text'"
                  size="mini"
                  round
                  :class="[
                    currentTab == 'page' && pageVal === comp.domId
                      ? 'el-button--primary'
                      : '',
                  ]"
                  :key="comp.domId"
                  @click="setPageAction(comp.domId)"
                >
                  {{ comp.domName || comp.domId }}
                </el-button>
              </template>
            </div>
          </el-tab-pane>
          <el-tab-pane label="表单">
            <div class="choose-panel">
              <template v-for="comp in comps">
                <el-button
                  v-if="comp.type == 'base-form'"
                  size="mini"
                  round
                  :class="[
                    currentTab == 'page' && pageVal == comp.domId
                      ? 'el-button--primary'
                      : '',
                  ]"
                  :key="comp.domId"
                  @click="setPageAction(comp.domId)"
                >
                  {{ comp.domName || comp.domId }}
                </el-button>
              </template>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>

      <el-tab-pane v-if="tabs.indexOf('tel') > -1" label="拨打电话" name="tel">
        <el-form label-width="100px">
          <el-form-item label="电话号码：">
            <el-input
              placeholder="请输入电话号码"
              v-model="telVal"
              :maxlength="11"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <div slot="footer" class="dialog-footer">
      <el-button @click="emit('close')">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, getCurrentInstance, watch, onMounted } from '@vue/composition-api'
const props = defineProps({
  option: {
    type: Object,
  },
  tabs: {
    type: Array,
  },
  index: {
    type: Number,
  },
  comps: {
    type: Array,
  },
})
const emit = defineEmits(['close'])
const { $bus } = getCurrentInstance().proxy
const dialogShow = ref(true),
  codeVal = ref(''),
  currentTab = ref(''),
  outsideVal = ref(null),
  logicVal = ref({
    type: '',
    content: null,
  }),
  pageVal = ref(null),
  telVal = ref('')
let returnVal = null

function getCurrentTab() {
  if (props.tabs && props.tabs.length === 1) {
    return props.tabs[0]
  }
  return props.option?.settings?.config[props.index].click?.type || 'outside'
}

function getVal(type) {
  if (props.option?.settings?.config[props.index]?.click) {
    if (props.option?.settings?.config[props.index]?.click.type === type) {
      return props.option?.settings?.config[props.index]?.click.href
    }
  }
  return ''
}

function getOldVal() {
  return props.option?.settings?.config[props.index]?.click || null
}

function setPageAction(id) {
  pageVal.value = id
  returnVal = {
    type: 'page',
    href: id,
  }
}

function clickTab(tab) {
  currentTab.value = tab.name
}
function sure() {
  dialogShow.value = false
  if (currentTab.value === 'outside' && outsideVal.value) {
    returnVal = {
      type: 'outside',
      href: outsideVal.value,
    }
  }
  if (currentTab.value === 'logic' && logicVal.value) {
    returnVal = {
      type: 'logic',
      href: `${logicVal.value.type}://${logicVal.value.content}`,
    }
  }
  if (currentTab.value === 'tel' && telVal.value) {
    returnVal = {
      type: 'tel',
      href: telVal.value,
    }
  }
  $bus.$emit('click:submit', props.index, returnVal)
}
onMounted(() => {
  currentTab.value = getCurrentTab()
  props.tabs.forEach((item) => {
    switch (item) {
      case 'outside':
        outsideVal.value = getVal('outside')
        break
      case 'page':
        pageVal.value = getVal('page')
        break
      case 'tel':
        telVal.value = getVal('tel')
        break
    }
  })
  returnVal = getOldVal()
})
</script>

<style lang="scss">
#click {
  .el-dialog__body {
    padding-top: 10px;

    .choose-panel {
      line-height: 2.8;
    }
  }
}
</style>
