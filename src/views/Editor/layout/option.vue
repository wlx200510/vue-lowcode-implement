<template>
  <div class="app-option">
    <el-form ref="options-form" label-width="80px" size="mini">
      <h2>【{{ option.title }}】</h2>
      <el-form-item class="small" label="组件编号：">
        <span>{{ option.domId }}</span>
      </el-form-item>
      <el-form-item class="small" label="组件名称：">
        <el-input
          v-model="option.domName"
          maxlength="30"
          placeholder="非必填，页内跳转配置使用"
        ></el-input>
      </el-form-item>

      <template v-if="option.base && option.base.length">
        <template v-for="(item, idx) in option.base">
          <form-item :item="item" :index="idx"></form-item>
        </template>
      </template>

      <template v-if="option.style && option.style.length">
        <h3><i class="el-icon-setting"></i> 样式配置</h3>
        <template v-for="(item, idx) in option.style">
          <form-item :item="item" :index="idx"></form-item>
        </template>
      </template>

      <template v-if="option.others && option.others.config.length">
        <h3><i class="el-icon-setting"></i> {{ option.others.title }}</h3>
        <template v-for="(item, idx) in option.others.config">
          <form-item :item="item" :index="idx"></form-item>
        </template>
      </template>

      <!-- 根据组件类型动态配置 -->

      <template v-if="option.action">
        <h3><i class="el-icon-setting"></i> {{ option.action.title }}</h3>
        <Settings
          :name="option.name"
          :config="option.action.config"
          :style="option.style"
        ></Settings>
        <template v-if="option.action.type === 'image-click'">
          <el-button
            icon="el-icon-plus"
            :disabled="!option.style[1].val"
            round
            @click="imageClickShow = true"
            >点击区域配置</el-button
          >
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>
// 需要把这些setting都动态
import formItem from '@/components/common/formItem.vue'
// 下面的这些全都用动态组件来实现
import Settings from './_settings.vue'

export default {
  name: 'AppOption',
  data() {
    return {
      imageClickShow: false,
    }
  },
  components: {
    formItem,
    Settings,
  },
  props: {
    option: {
      type: Object,
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
.app-option {
  width: 360px;
  padding: 0 10px 0 5px;
  overflow: auto;
  border-left: 1px solid #e8e8e8;

  h2 {
    margin: 13px 0;
    font-size: 14px;
  }

  .el-form {
    padding-bottom: 30px;

    > h3 {
      background-color: #f2f3f4;
      padding: 5px 10px;
      font-size: 14px;
    }

    .el-form-item.small {
      margin-bottom: 5px;

      .font-set {
        display: inline-block;
        width: 28px;
        height: 28px;
        text-align: center;
        cursor: pointer;
        &.checked {
          color: #fff;
          background-color: #333;
        }
      }

      .el-date-editor.el-input {
        width: 186px;
        .el-input__inner {
          padding-left: 30px !important;
        }
      }

      .el-input__inner {
        padding: 0 10px;
      }

      .el-textarea__inner {
        padding: 5px 10px;
      }

      .el-form-item__label {
        padding-right: 0;
        font-size: 13px;
      }
    }

    .form-list-panel {
      margin-top: 15px;
      border: 1px solid #e8e8e8;
      padding: 10px 10px 5px 5px;

      &:first-child {
        margin-top: 0;
      }

      .list-item-opt {
        text-align: right;

        > a {
          margin-left: 10px;
          color: #2aa7ff;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
