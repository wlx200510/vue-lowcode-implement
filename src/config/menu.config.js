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

function getMenuItems(type) {
  const canShowComp = configItems.filter((compConfig) => {
    // 空数组则直接返回true，说明所有type都可以
    if (compConfig.projectTypes?.length > 0) {
      return compConfig.projectTypes.includes(type)
    }
    return true
  })
  let menuItems = []
  CATEGORY.forEach((item) => {
    item.items =
      canShowComp.filter((config) => config.category === item.key) || []
    menuItems.push(item)
  })
  return menuItems
}

export default getMenuItems
