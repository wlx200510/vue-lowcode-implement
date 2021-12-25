/**
 * 尝试自动生成这个JSON结构
 */
import configModulesFunc from '@/kitLoader/loader/conf'
const CATEGORY = [
  {
    title: '通用组件',
    key: 'general',
    collapse: false,
  },
  {
    title: '样式模块',
    key: 'pageModule',
    collapse: true,
  },
  {
    title: '轮播组件',
    key: 'swiper',
    collapse: true,
  },
  {
    title: '图文列表',
    key: 'list',
    collapse: true,
  },
  {
    title: '动画效果',
    key: 'animate',
    collapse: true,
  },
]

const configItems = configModulesFunc()

let menuItems = []
CATEGORY.forEach((item) => {
  item.items =
    configItems.filter((config) => config.category === item.key) || []
  menuItems.push(item)
})

export default menuItems
