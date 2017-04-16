const SupplierProductNames = require('_/collections/supplierProductNames')
const Supplier = require('_/models/supplier')
const PriceListData = require('_/collections/priceListData')
const PriceListCollection = require('_/models/priceListCollection')
const PriceLists = require('_/collections/priceLists')
const Promise = require('bluebird')
const logger = require('_/logger')
// const _ = require('lodash')
const bookshelf = require('_/database')

const arrangeToDbFormat = (req, res, next) => {
  Promise.coroutine(function * () {
      let start = new Date()
      let files = req.parsedCsv
      let dbFormatArray = []

      // *************************************************************************************************************************
      //  PRICE LIST DATA
      // *************************************************************************************************************************

      // Get access to supplier and master product name ids
      let results = yield bookshelf.knex.select('id', 'supplier_product_name', 'master_product_name_id').from('supplier_product_name')
      logger.debug(`SupplierProductNames: ${results.length}`)
      let supplierProductNames = SupplierProductNames.forge(results)
      let supplierProductNamesIds = supplierProductNames.getNameIdPairs('supplier_product_name', 'id')
      let masterSupplierIdMatch = supplierProductNames.getNameIdPairs('id', 'master_product_name_id')
      //
      let priceListDataObjs = []
      let skippedObjs = []
      files.forEach(file => {
        let supplierId = file.supplierId
        let priceListId = null
        logger.debug(`${file.fileName} has ${file.csv.length} records`)
        file.csv.forEach(record => {
          let supplierProductNameId = supplierProductNamesIds[record['product_name']]
          let masterProductNameId = masterSupplierIdMatch[supplierProductNameId]
          let priceListDataObj = {}
          let skipRecord = false
          // TODO: Add error object with failed records
          if (supplierProductNameId && record['whole_sale_price']) {
            // Required fields
            priceListDataObj['supplier_product_name_id'] = supplierProductNameId
            priceListDataObj['whole_sale_price'] = record['whole_sale_price']
          } else {
            skipRecord = true
          }

          if (!skipRecord) {
            // FK
            priceListDataObj['supplier_id'] = supplierId
            priceListDataObj['price_list_id'] = null
            priceListDataObj['price_list_collection_id'] = null
            priceListDataObj['master_product_name_id'] = masterProductNameId
            // Optional fields
            priceListDataObj['bonus'] = file['bonus'] ? record['bonus'] : null
            priceListDataObj['bonus_1'] = file['bonus1'] ? record['bonus_1'] : null
            priceListDataObj['bonus_2'] = file['bonus2'] ? record['bonus_2'] : null
            priceListDataObj['bonus_3'] = file['bonus3'] ? record['bonus_3'] : null
            priceListDataObj['expiry_date'] = file['expiry date'] ? record['expiry_date'] : null
            priceListDataObj['stock'] = file['stock'] ? record['stock'] : null
            priceListDataObj['retail_price'] = file['retail price'] ? record['retail_price'] : null
            priceListDataObj['agency_id'] = file['agency id'] ? record['agency_id'] : null
            priceListDataObj['moh_percentage'] = file['m.o.h. %'] ? record['moh_percentage'] : null
            priceListDataObj['serial_number'] = file['serial number'] ? record['serial_number'] : null

            priceListDataObjs.push(priceListDataObj)
          } else {
            skippedObjs.push(priceListDataObj)
          }
        })
      })
      logger.debug(`Skipped records: ${skippedObjs.length}`)
      // logger.debug(skippedObjs)
      let priceListData = PriceListData.forge(priceListDataObjs)
      yield priceListData.batchInsert(3000, {transacting: t})
      logger.info(`Saved ${priceListDataObjs.length} price list records`)
      logger.info('DB Process took: ' + (new Date() - start) + 'ms')
  })()
  .then(() => {
    logger.info('DB Transaction successful')
    next()
  })
  .catch(err => {
    logger.info('DB Transaction failed')
    logger.info(err)
    next(err)
  })
}

module.exports = arrangeToDbFormat
