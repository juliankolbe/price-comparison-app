const Promise = require('bluebird')

const middlewareHelper = (() => {
  const wrapCR = (genFn) => { // 1
    var cr = Promise.coroutine(genFn) // 2
    return function (req, res, next) { // 3
      cr(req, res, next).catch(next) // 4
    }
  }

  return {
    wrapCR: wrapCR
  }
})()

module.export = middlewareHelper
