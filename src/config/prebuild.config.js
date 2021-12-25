module.exports = {
  title: '页面配置',
  base: [
    {
      type: 'base-text',
      label: '页面名称',
      attr: 'name',
      placeholder: '例：双十一专题主页',
      val: '',
      isNecessary: true,
    },
    {
      type: 'radio',
      label: '回到顶部',
      attr: 'gotop',
      val: true,
      options: [
        {
          name: '显示',
          val: true,
        },
        {
          name: '不显示',
          val: false,
        },
      ],
      isNecessary: false,
    },
    {
      type: 'base-text',
      label: '路由名称',
      attr: 'router',
      rules: {
        regex: '^[0-9a-z_-]{1,}$',
        tips: '只能输入字母、数字、中划线或者下划线',
      },
      placeholder: 'hash路由对应的名称',
      val: '',
      isNecessary: true,
    },
  ],
  style: [
    {
      type: 'color-picker',
      label: '背景颜色',
      attr: 'background-color',
      val: '#ffffff',
    },
    {
      type: 'upload',
      label: '背景图片',
      attr: 'background-image',
      val: '',
    },
    {
      type: 'select',
      label: '背景效果',
      attr: 'background-repeat',
      val: '',
      options: [
        {
          name: '无',
          val: 'no-repeat',
        },
        {
          name: '水平重复',
          val: 'repeat-x',
        },
        {
          name: '垂直重复',
          val: 'repeat-y',
        },
        {
          name: '水平+垂直重复',
          val: 'repeat',
        },
      ],
    },
  ],
}
