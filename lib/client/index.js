// require('./server.babel')
require('babel-register')

// var path = require('path')
// var rootDir = path.resolve(__dirname, '..')
var rootDir = '/usr/src/app/lib/client'
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false
global.__SERVER__ = true
global.__DISABLE_SSR__ = false  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools')
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack/webpack-isomorphic-tools'))
  .development(__DEVELOPMENT__)
  .server(rootDir, function () {})
  // .then(function (result) {
  //   console.log(result)
  //   result
  // })
  // .server(rootDir, function () {
  //   require('_/client/src/server.js')
  // })

const serverEntry = require('./src/server.js')

module.exports = serverEntry
