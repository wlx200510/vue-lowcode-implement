/* eslint-disable @typescript-eslint/no-var-requires */
const scriptPlugin = require('unplugin-vue2-script-setup/webpack')
module.exports = {
  parallel: false,
  transpileDependencies: ['@vue/composition-api'],
  configureWebpack: {
    plugins: [scriptPlugin()],
  },
  chainWebpack(config) {
    // disable type check and let `vue-tsc` handles it
    config.plugins.delete('fork-ts-checker')
  },
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: true,
    },
  },
}
