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
      type: 'desc',
      label: '路由名称',
      attr: 'router',
      val: '',
      isNecessary: true,
    },
    {
      type: 'desc',
      label: '文件位置',
      attr: 'position',
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
