const appRoot = require('app-root-path')

const config = {
  path: {
    root: appRoot.path,
    publicDirectory: appRoot.path + '/public',
    lib: appRoot.path + '/lib'
  },
  priceComparison: {
    downloadPath: appRoot.path + '/tmp/download/pc-comparison.csv'
  }
}

module.exports = config
