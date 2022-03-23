export default {
  name: 'bottomMenu',
  key: 'bottom-menu',
  text: '底部导航',
  icon: 'fa-adjust',
  category: 'general',
  projectTypes: [],
  condition: {},
  default: {
    title: '底部导航',
    domId: '',
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
          type: 'basee-text',
          name: 'click',
          click: null,
          val: '',
        },
      ],
    },
  },
}
