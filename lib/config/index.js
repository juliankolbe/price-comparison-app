const appRoot = require('app-root-path')

const config = {
  path: {
    root: appRoot.path,
    publicDirectory: appRoot.path + '/public',
    lib: appRoot.path + '/lib'
  }
}

module.exports = config
