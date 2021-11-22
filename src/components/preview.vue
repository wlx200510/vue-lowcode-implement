<template>
  <el-dialog
    id="preview"
    title="页面预览"
    :close-on-click-modal="false"
    :append-to-body="false"
    :visible.sync="visible"
    @close="emit('update:show', false)"
    width="395px"
  >
    <el-row>
      <el-col
        :span="12"
        style="text-align: center; width: 375px; background-color: #f2f3f4"
      >
        <iframe id="ifr-preview" :allowtransparency="true" src=""></iframe>

        <div class="pre-desc">
          <h3 style="color: red">预览说明：</h3>
          <p>预览仅供参考，不代表真机效果；</p>
          <p>部分用户相关的内容，需要对应的用户登录态进行预览</p>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from '@vue/composition-api'
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:show'])
const visible = ref(props.show)
watch(props.show, (newVal) => {
  if (newVal && document.getElementById('ifr-preview')) {
    document.getElementById('ifr-preview').contentWindow.location.reload(true)
  }
  visible.value = newVal
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
      width: 180px;
      height: 250px;
      padding: 10px;
      background-color: #fff;

      > p {
        margin: 0;
        text-align: left;
        line-height: 1.5;
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
