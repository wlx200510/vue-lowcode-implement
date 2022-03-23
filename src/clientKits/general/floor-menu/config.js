export default {
  name: 'floorMenu',
  key: 'floor-menu',
  text: '楼层导航',
  icon: 'fa-list-ol',
  category: 'general',
  projectTypes: [],
  condition: {},
  default: {
    title: '楼层导航',
    domId: '',
    domName: '',
    style: [
      {
        type: 'color-picker',
        label: '默认背景',
        attr: 'background-color',
        val: '#ffffff',
        isNecessary: true,
      },
      {
        type: 'color-picker',
        label: '选中背景',
        attr: 'background-color:hover',
        val: '#ffffff',
        isNecessary: true,
      },
      {
        type: 'color-picker',
        label: '默认字体',
        attr: 'color',
        val: '#4a4a4a',
        isNecessary: true,
      },
      {
        type: 'color-picker',
        label: '选中字体',
        attr: 'color:hover',
        val: '#D0021B',
        isNecessary: true,
      },
    ],
    action: {
      type: 'floor-menu-click',
      title: '导航项配置',
    },
    settings: {
      config: [
        {
          text: '默认项1',
          click: null,
        },
      ],
    },
  },
}
