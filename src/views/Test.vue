<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Upload label="test" :item="curItem" @uploadSuccess="trigger" />
  </div>
</template>

<script setup>
import { reactive } from '@vue/composition-api'
import Upload from '@/components/common/upload.vue'
const curItem = reactive({
  width: 0,
  height: 0,
  val: '',
})
function trigger(data) {
  console.log(data)
}
</script>
