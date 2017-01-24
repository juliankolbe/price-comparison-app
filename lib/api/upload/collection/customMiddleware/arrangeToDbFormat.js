const SupplierProductNames = require('_/collections/supplierProductNames')
const Supplier = require('_/models/supplier')
const PriceListData = require('_/collections/priceListData')
const PriceListCollection = require('_/models/priceListCollection')
const PriceLists = require('_/collections/priceLists')
const Promise = require('bluebird')
const logger = require('_/logger')
// const _ = require('lodash')
const bookshelf = require('_/database')
const moment = require('moment-timezone')

const arrangeToDbFormat = (req, res, next) => {
  Promise.coroutine(function * () {
      let start = new Date()
      // *************************************************************************************************************************
      //  VARIABLES
      // *************************************************************************************************************************
      let files = req.parsedCsv
      let fileFormMeta = req.fileFormMeta
      // Throw Error if no Date was supplied
      if (!fileFormMeta.datedAt) {
        let err = new Error(`No date supplied for Collection`)
        err.statusCode = 422
        throw err
      }
      let datedAt = moment(fileFormMeta.datedAt).tz('Asia/Dubai').format('YYYY-MM-DD')

      // *************************************************************************************************************************
      //  PRICE LIST COLLECTION
      // *************************************************************************************************************************

      // TODO: External data needed:  userid
      let numberOfLists = files.length
      let priceListCollectionObj = {'number_of_lists': numberOfLists, 'dated_at': datedAt}
      let savedCollection = yield PriceListCollection.forge(priceListCollectionObj).save(null, {transacting: t})
      collectionId = savedCollection.attributes.id

      // *************************************************************************************************************************
      //  PRICE LISTS
      // *************************************************************************************************************************

      // Get access to supplier ids
      let suppliers = yield Supplier.fetchAll()
      let supplierIds = suppliers.getNameIdPairs('name', 'id')
      // let lowerSupplierIds = _.transform(supplierIds, (result, val, key) => { result[key.toLowerCase()] = val }, {})
      //
      let priceListObjs = []
      files.forEach((file, i) => {
        let priceListObj = {}
        // let supplierId = supplierIds[fileFormMeta[file.fileName].supplier]
        let supplierId = file.supplierId
        // Foreign Keys
        priceListObj['supplier_id'] = supplierId
        priceListObj['price_list_collection_id'] = collectionId
        // Pricelist meta data
        priceListObj['has_retail_price'] = file['retail price']
        priceListObj['has_triple_bonus'] = file['bonus1'] && file['bonus2'] && file['bonus3']
        priceListObj['has_bonus'] = file.bonus
        priceListObj['has_expiry_date'] = file['expiry date']
        priceListObj['has_stock'] = file.stock
        // priceListObj['has_whole_sale_price'] = file['whole sale price']
        // priceListObj['has_stock'] = 'asdsadasdasd' // Force Error
        priceListObj['dated_at'] = datedAt
        priceListObj['file_name'] = file.fileName
        priceListObj['number_of_products'] = file.csv.length

        priceListObjs.push(priceListObj)
        // Add supplier id to files array
        // files[i].supplierId = supplierId
      })

      let savedPriceLists = yield PriceLists.forge(priceListObjs).invokeThen('save', null, {transacting: t})

      // Get access to priceList ids that were just saved, by filename as its the only thing linking it to the local array
      let priceListIds = {}
      savedPriceLists.forEach(list => {
        let atts = list.attributes
        priceListIds[atts['file_name']] = atts.id
      })
      //

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
        let priceListId = priceListIds[file.fileName]
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
            priceListDataObj['price_list_id'] = priceListId
            priceListDataObj['price_list_collection_id'] = collectionId
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
