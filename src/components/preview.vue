<template>
  <el-dialog
    id="preview"
    title="页面预览"
    :close-on-click-modal="false"
    :append-to-body="false"
    :visible="true"
    @close="emit('close')"
    width="395px"
  >
    <el-row>
      <el-col
        :span="12"
        style="text-align: center; width: 375px; background-color: #f2f3f4"
      >
        <div id="ifrPreview"></div>

        <div class="pre-desc">
          <h3 style="color: red">预览说明：</h3>
          <ul>
            <li>预览仅供参考，不代表真机效果；</li>
            <li>部分用户相关的内容，需要对应的用户登录态进行预览；</li>
            <li>由于交互需要运行时数据，点击事件在本界面被禁止；</li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted, getCurrentInstance } from '@vue/composition-api'
import Postmate from 'postmate'
let handShake = null
const props = defineProps({
  pageConfig: {
    type: Object,
  },
  comp: {
    type: Array,
  },
})
const emit = defineEmits(['close'])
const { $nextTick } = getCurrentInstance().proxy

onMounted(() => {
  $nextTick(() => {
    handShake = new Postmate({
      container: document.getElementById('ifrPreview'),
      url: 'http://localhost:3000/preview.html',
      name: 'child-iframe',
      classListArray: ['iframe-dom'],
    })
    handShake.then((child) => {
      child.call(
        'getData',
        JSON.stringify({
          pageConfig: props.pageConfig,
          compList: props.comp,
        })
      )
    })
  })
})
</script>

<style lang="scss">
#preview {
  .el-dialog {
    border-radius: 10px !important;
  }

  .el-dialog__body {
    padding: 0px 10px 50px 10px !important;

    .pre-desc {
      position: absolute;
      left: 110%;
      top: 20%;
      width: 220px;
      height: 250px;
      padding: 10px;
      background-color: #fff;
      text-align: left;

      > ul {
        margin: 0;
        text-align: left;
        line-height: 1.5;
        li {
          text-align: left;
          list-style: none;
          padding-bottom: 10px;
        }
      }
    }

    iframe {
      display: block;
      border: none;
      outline: 1px solid #e8e8e8;
      width: 375px;
      height: 630px;
      overflow: hidden;
      border: none;
      padding: 0;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
