export default {
  name: '记录页面',
  settings: [
    {
      type: 'base-text',
      label: '页面内容',
      attr: 'desc',
      placeholder: '输入页面内容',
      val: '',
      isNecessary: true,
    },
    {
      type: 'color-picker',
      label: '字体颜色',
      attr: 'color',
      val: '#999999',
      isNecessary: true,
    },
  ],
}
