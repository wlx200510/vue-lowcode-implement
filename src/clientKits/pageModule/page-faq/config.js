export default {
  name: 'pageFaq',
  key: 'page-faq',
  text: 'FAQ模块',
  icon: 'fa-quora',
  category: 'pageModule',
  projectTypes: [],
  condition: {},
  default: {
    title: 'FAQ模块',
    domId: '',
    domName: '',
    style: [
      {
        type: 'input-number',
        label: '字体大小',
        attr: 'font-size',
        val: 12,
        unit: 'px',
        step: 1,
        max: 100,
        min: 10,
        isNecessary: false,
      },
      {
        type: 'input-number',
        label: '上边距',
        attr: 'padding-top',
        val: 10,
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
        val: 15,
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
        val: 10,
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
        val: 15,
        unit: 'px',
        min: 0,
        max: 50,
        step: 1,
        isNecessary: true,
      },
    ],
    action: {
      type: 'page-faq-list',
      title: 'F&Q配置',
    },
    settings: {
      config: [
        {
          text: '默认FAQ信息',
          isAuthor: 1,
          val: '',
          limit: {
            w: 50,
            h: 50,
            s: 40,
          },
          title: '问题描述',
        },
      ],
    },
  },
}