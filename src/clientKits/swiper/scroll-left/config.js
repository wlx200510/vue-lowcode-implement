export default {
  name: 'scrollLeft',
  key: 'scroll-left',
  text: '横向滚动',
  icon: 'fa-exchange',
  category: 'swiper',
  projectTypes: [],
  condition: {},
  default: {
    title: '横向滚动',
    domId: '',
    domName: '',
    style: [
      {
        type: 'select',
        label: '样式风格',
        attr: 'theme',
        val: 'scroll-x',
        options: [
          {
            name: '滚动条不连续',
            val: 'scroll-x',
          },
          {
            name: '无滚动条连续',
            val: 'no-scroll',
          },
        ],
      },
      {
        type: 'color-picker',
        label: '背景颜色',
        attr: 'background-color',
        val: '',
        isNecessary: false,
      },
    ],
    action: {
      type: 'left-scroll-click',
      title: '滚动项配置',
    },
    settings: {
      config: [
        {
          val: '',
          click: null,
        },
      ],
    },
  },
}
