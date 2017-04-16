const bookshelf = require('_/database')
const SupplierProductName = require('_/models/supplierProductName')
const Supplier = require('_/models/supplier')
const Promise = require('bluebird')
const DB = require('../db')

module.exports = () => {
  return Promise.coroutine(function * () {
    // Fetch required data from database
    let db = new DB()
    let supplierNameIds = yield db.fetchSupplierIdNamePairs()
    let supplierProductNameIds = yield db.fetchSupplierPNIdNamePairs()
    let masterProductNamesKnex = yield db.fetchMasterPNs()

    return {
      supplierNameIds: supplierNameIds,
      supplierProductNameIds: supplierProductNameIds,
      masterProductNamesKnex: masterProductNamesKnex
    }
  })()
  .then(nameIdPairs => {
    if (Object.keys(nameIdPairs.supplierNameIds).length < 1) throw new Error('No suppliers found')
    else if (Object.keys(nameIdPairs.supplierProductNameIds).length < 1) throw new Error('No supplier product names found')
    else if (nameIdPairs.masterProductNamesKnex.length < 1) throw new Error('No master product names found')
    else return nameIdPairs
  })
}
