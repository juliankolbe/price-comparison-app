// const SupplierProductName = require('_/models/supplierProductName')
// const SupplierProductNames = require('_/collections/supplierProductNames')
// const Supplier = require('_/models/supplier')
// const MasterProductName = require('_/models/masterProductName')
// const MasterProductNames = require('_/collections/masterProductNames')
const Promise = require('bluebird')
const logger = require('_/logger')
const _ = require('lodash')
const bookshelf = require('_/database')

const supplierMasterDb = (req, res, next) => {
  Promise.coroutine(function * () {
    let start = new Date()

    logger.debug(req.parsedCsv)
    // logger.debug(req.body.data)

    logger.info('DB Process took: ' + (new Date() - start) + 'ms')
    next()
  })()
  .catch(err => {
    logger.info(err)
    next(err)
  })
}

module.exports = supplierMasterDb
