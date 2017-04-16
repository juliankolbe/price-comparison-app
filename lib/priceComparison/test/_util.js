exports.mochaGen = function () {
  const mocha = require('mocha')
  const coMocha = require('co-mocha')
  coMocha(mocha)
}
