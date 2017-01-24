const bookshelf = require('_/database')
const SupplierProductName = require('_/models/supplierProductName')
const Supplier = require('_/models/supplier')
const Promise = require('bluebird')

module.exports = () => {
  return Promise.coroutine(function * () {
    // Fetch required data from database
    let suppliers = yield Supplier.fetchAll()
    let supplierNameIds = suppliers.getNameIdPairs('id', 'name')

    let supplierProductNames = yield SupplierProductName.fetchAll()
    let supplierProductNameIds = supplierProductNames.getNameIdPairs('id', 'supplier_product_name')

    let masterProductNamesKnex = yield bookshelf.knex.select('id', 'master_product_name').from('master_product_name')

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
