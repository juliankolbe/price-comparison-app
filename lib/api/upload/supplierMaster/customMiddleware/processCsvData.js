// const SupplierProductName = require('_/models/supplierProductName')
// const SupplierProductNames = require('_/collections/supplierProductNames')
// const Supplier = require('_/models/supplier')
// const MasterProductName = require('_/models/masterProductName')
// const MasterProductNames = require('_/collections/masterProductNames')
const Promise = require('bluebird')
const logger = require('_/logger')
const _ = require('lodash')

const processCsvData = (req, res, next) => {
  Promise.coroutine(function * () {
    // logger.debug(req.parsedCsv[0])
    // // logger.debug(req.files)
    let processedCsv = []
    req.parsedCsv[0].csv.forEach((record) => {
      let pickedRecord = _.pickBy(record, (value, key) => value !== '-' && value !== '')
      processedCsv.push(pickedRecord)
    })
    // logger.debug(processedCsv)
    req.processedCsv = processedCsv
    next()
  })()
  .catch(err => {
    logger.info(err)
    next(err)
  })
}

module.exports = processCsvData
