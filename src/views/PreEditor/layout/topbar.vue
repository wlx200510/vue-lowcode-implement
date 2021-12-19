<template>
  <el-row class="app-toolbar">
    <el-col :span="12">
      <span
        ><i class="fa fa-mobile-phone"></i> 当前适配设计稿：750x1334 px</span
      >
    </el-col>
    <el-col :span="12">
      <div class="bar-btn" @click="saveAll()">
        <i class="el-icon-edit"></i>
        <span>保存</span>
      </div>
      <div class="bar-btn" @click="syncPreview()">
        <i class="el-icon-view"></i>
        <span>同步</span>
      </div>
    </el-col>
  </el-row>
</template>
<script setup>
const emit = defineEmits(['syncPreview', 'savePageSet'])

function syncPreview() {
  emit('syncPreview')
}
function saveAll() {
  emit('savePageSet')
}
</script>
<script>
export default {
  name: 'AppToolbar',
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-toolbar {
  position: relative;
  height: 40px;
  line-height: 38px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  padding-left: 15px;

  > :last-child {
    text-align: right;
  }

  .bar-btn {
    display: inline-block;
    white-space: nowrap;
    padding: 0 16px;
    font-size: 14px;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    cursor: pointer;

    &:hover {
      background-color: #e8e8e8;
    }
  }
}
</style>
