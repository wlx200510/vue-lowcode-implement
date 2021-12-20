/* eslint-disable @typescript-eslint/no-var-requires */
const args = require('minimist')(process.argv.slice(2))

const configB = require('./scripts/backend.conf')
const configC = require('./scripts/client.conf')

module.exports = function () {
  const { mode, port, project } = args
  if (project === 'c') {
    const params = {
      port: port || 3000,
    }
    return configC(params)
  } else {
    return configB()
  }
}
