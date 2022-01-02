<!-- 组装页面的预览路由 -->
<template>
  <div class="comp-blocks" v-if="pageData">
    <component
      v-for="comp in compList"
      :key="comp.domId"
      :is="comp.name"
      :component="comp"
      :preview="false"
    ></component>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['pageData'],
  data() {
    return {
      mockData: [
        {
          title: '图片',
          domId: 'base-image-9cc5xcmdob',
          domName: '',
          style: [
            {
              type: 'color-picker',
              label: '背景颜色',
              attr: 'background-color',
              val: '',
              isNecessary: false,
            },
            {
              type: 'upload',
              label: '上传图片',
              attr: 'src',
              val: 'https://conan-online.fbcontent.cn/conan-oss-resource/zebra16152867077863917.png',
              isNecessary: true,
            },
            {
              type: 'input-number',
              label: '上边距',
              attr: 'padding-top',
              val: 0,
              unit: 'px',
              min: 0,
              max: 50,
              step: 1,
              isNecessary: true,
            },
            {
              type: 'input-number',
              label: '右边距',
              attr: 'padding-right',
              val: 0,
              unit: 'px',
              min: 0,
              max: 50,
              step: 1,
              isNecessary: true,
            },
            {
              type: 'input-number',
              label: '下边距',
              attr: 'padding-bottom',
              val: 0,
              unit: 'px',
              min: 0,
              max: 50,
              step: 1,
              isNecessary: true,
            },
            {
              type: 'input-number',
              label: '左边距',
              attr: 'padding-left',
              val: 0,
              unit: 'px',
              min: 0,
              max: 50,
              step: 1,
              isNecessary: true,
            },
          ],
          action: {
            type: 'image-click',
            title: '点击区域配置',
          },
          settings: {
            config: [
              {
                index: 0,
                x: 0,
                y: 0,
                w: 225,
                h: 64,
                click: null,
              },
            ],
          },
          type: 'base-image',
          name: 'BaseImage',
          active: false,
        },
        {
          title: '图片',
          domId: 'base-image-1wl5lfyhptl',
          domName: '',
          style: [
            {
              type: 'color-picker',
              label: '背景颜色',
              attr: 'background-color',
              val: '',
              isNecessary: false,
            },
            {
              type: 'upload',
              label: '上传图片',
              attr: 'src',
              val: 'https://conan-online.fbcontent.cn/conan-oss-resource/zebra16152867077863917.png',
              isNecessary: true,
            },
            {
              type: 'input-number',
              label: '上边距',
              attr: 'padding-top',
              val: 0,
              unit: 'px',
              min: 0,
              max: 50,
              step: 1,
              isNecessary: true,
            },
            {
              type: 'input-number',
              label: '右边距',
              attr: 'padding-right',
              val: 0,
              unit: 'px',
              min: 0,
              max: 50,
              step: 1,
              isNecessary: true,
            },
            {
              type: 'input-number',
              label: '下边距',
              attr: 'padding-bottom',
              val: 0,
              unit: 'px',
              min: 0,
              max: 50,
              step: 1,
              isNecessary: true,
            },
            {
              type: 'input-number',
              label: '左边距',
              attr: 'padding-left',
              val: 0,
              unit: 'px',
              min: 0,
              max: 50,
              step: 1,
              isNecessary: true,
            },
          ],
          action: {
            type: 'image-click',
            title: '点击区域配置',
          },
          settings: {
            config: [
              {
                index: 0,
                x: 0,
                y: 0,
                w: 225,
                h: 64,
                click: null,
              },
            ],
          },
          type: 'base-image',
          name: 'BaseImage',
          active: false,
        },
        {
          title: '底部导航',
          domId: 'bottom-menu-7asrrzp9wv',
          domName: '',
          style: [
            {
              type: 'input-number',
              label: '容器高度',
              attr: 'height',
              val: 40,
              unit: 'px',
              min: 0,
              max: 100,
              step: 1,
              isNecessary: false,
            },
            {
              type: 'color-picker',
              label: '背景颜色',
              attr: 'background-color',
              val: '#ffffff',
              isNecessary: false,
            },
          ],
          action: {
            type: 'bottom-menu-click',
            title: '点击项配置',
          },
          settings: {
            config: [
              {
                desc: '点击项配置',
                type: 'text',
                name: 'click',
                click: null,
                val: '',
              },
            ],
          },
          type: 'bottom-menu',
          name: 'BottomMenu',
          active: false,
          fixed: true,
        },
      ],
    }
  },

  computed: {
    compList() {
      if (!this.pageData) {
        return []
      }
      return this.pageData.compList
    },
    pageConfig() {
      return this.pageData?.pageConfig
    },
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.comp-blocks {
  width: 100%;
  min-height: 100vh;
}
</style>
