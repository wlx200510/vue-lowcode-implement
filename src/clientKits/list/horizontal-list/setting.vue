<template>
  <div>
    <template v-if="list && list.length">
      <div class="form-list-panel" v-for="(item, idx) in list">
        <upload :label="'图片' + (idx + 1)" :index="idx" :item="item"> </upload>
        <el-form-item class="small" label="标题：">
          <el-input
            v-model="item.title"
            :maxlength="128"
            placeholder="必填"
          ></el-input>
        </el-form-item>
        <el-form-item class="small" label="描述：">
          <el-input
            v-model="item.desc"
            :maxlength="128"
            placeholder="必填"
          ></el-input>
        </el-form-item>
        <template v-if="item.click">
          <el-form-item class="small" label="跳转到：">
            <span style="word-break: break-all">{{ item.click.href }}</span>
          </el-form-item>
        </template>
        <el-form-item class="small" label="点击配置：">
          <el-button icon="el-icon-edit" round @click="showClick(item, idx)"
            >配置跳转</el-button
          >
        </el-form-item>
        <div class="list-item-opt">
          <a href="javascript:;" v-if="idx !== 0" @click="upItem(idx)"
            ><i class="el-icon-arrow-up"></i
          ></a>
          <a
            href="javascript:;"
            v-if="idx !== list.length - 1"
            @click="downItem(idx)"
            ><i class="el-icon-arrow-down"></i
          ></a>
          <a href="javascript:;" v-if="idx > 0" @click="delItem(idx)"
            ><i class="el-icon-delete"></i
          ></a>
        </div>
      </div>
    </template>
    <el-button
      icon="el-icon-plus"
      style="margin-top: 15px"
      round
      @click="addItem"
      >添加列表项</el-button
    >
  </div>
</template>

<script>
import util from '@/utils/util.js'
import upload from '@/components/common/upload.vue'
import compConfig from '@/config/comp.config.js'
export default {
  components: {
    upload,
  },
  data() {
    return {
      list: this.config,
      defaultConf: util.copyObj(compConfig['horizontal-list']),
    }
  },
  props: {
    config: {
      type: Array,
    },
  },
  watch: {
    config: {
      handler(val) {
        this.list = val
      },
      deep: true,
    },
  },
  methods: {
    upItem(idx) {
      const tmp = util.copyObj(this.list[idx])
      this.list.splice(idx, 1)
      this.list.splice(idx - 1, 0, tmp)
    },
    downItem(idx) {
      const tmp = util.copyObj(this.list[idx])
      this.list.splice(idx, 1)
      this.list.splice(idx + 1, 0, tmp)
    },
    delItem(idx) {
      this.list.splice(idx, 1)
    },
    addItem() {
      if (this.list.length < 20) {
        this.list.push(util.copyObj(this.defaultConf.settings.config[0]))
      } else {
        this.$alert('最多添加20个列表项！')
      }
    },
    showClick(item, idx) {
      this.$bus.$emit('click:show', idx, ['outside', 'page'])
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss"></style>
