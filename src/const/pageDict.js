/**
 * 针对
 */
export const activityType = {
  Recommend: '推荐有礼',
  Distribution: '分销官',
  Exceed: '裂变活动',
}

export const activityPlugins = {
  Recommend: [
    { type: 1, value: '分享海报', key: 'POSTER' },
    { type: 4, value: '规则弹窗', key: 'RULE' },
  ],
  Distribution: [
    { type: 2, value: '分享链接', key: 'LINK' },
    { type: 4, value: '规则弹窗', key: 'RULE' },
  ],
  Exceed: [{ type: 3, value: '分享到APP', key: 'APP' }],
}
