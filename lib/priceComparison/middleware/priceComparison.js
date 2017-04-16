const logger = require('_/logger')
const Promise = require('bluebird')
const assert = require('assert')

const priceComparison = (arrangeProcess) => {
  assert(arrangeProcess, 'requires an ArrangeProcess instance')
  return (req, res, next) => {
    Promise.coroutine(function * () {
      let start = new Date()
      let priceListData
      // if collection id was provided, fetch price list data with it
      if (req.params && req.params.collectionId) {
        priceListData = yield arrangeProcess.getPriceListData({ collectionId: req.params.collectionId })
      }
      // else if price list data is already supplied
      else if (req.priceListData) { // eslint-disable-line
        priceListData = req.priceListData
      }
      let records = yield arrangeProcess.arrangeForFile(priceListData)

      req.outputCsv = records

      logger.info('Price comparison took: ' + (new Date() - start) + 'ms')
    })()
    .then(() => {
      logger.info('Creating price comparison data: success')
      next()
      return null
    })
    .catch(err => {
      logger.info('Creating Price comparison data: failed')
      logger.info(err)
      next(err)
    })
  }
}

module.exports = priceComparison
