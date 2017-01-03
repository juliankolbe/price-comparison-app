const SupplierProductNames = require('_/collections/supplierProductNames')
const Promise = require('bluebird')
const logger = require('_/logger')
// const _ = require('lodash')
const bookshelf = require('_/database')

const arrangePriceListData = (files, options) => {
  return Promise.coroutine(function * () {
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
    let statsObj = {}
    let filesHadErrors = false
    // loop through files
    files.forEach(file => {
      // Error Stats per File
      let errorReport = []
      let hadErrors = false
      let validProducts = 0
      let invalidProducts = 0
      statsObj[file.fileName] = { validProducts: 0, invalidProducts: 0, errorReport: null }

      logger.debug(`${file.fileName} has ${file.csv.length} records`)
      // Loop through records
      file.csv.forEach(record => {
        let priceListDataObj = {}
        let errorMessages = []
        let supplierProductNameId = supplierProductNamesIds[record['product_name']]
        let masterProductNameId = masterSupplierIdMatch[supplierProductNameId]

        // Required Fields, if not present add error messages
        if (supplierProductNameId) {
          priceListDataObj['supplier_product_name_id'] = supplierProductNameId
        } else {
          errorMessages.push('Supplier Product Name: not found')
          hadErrors = true
        }
        if (record['whole_sale_price']) {
          priceListDataObj['whole_sale_price'] = record['whole_sale_price']
        } else {
          errorMessages.push('Whole Sale Price: invalid')
          hadErrors = true
        }

        // FK
        if (file.supplierId) {
          priceListDataObj['supplier_id'] = file.supplierId
        } else {
          throw new Error(`No supplier Id provided for file: ${file.fileName}`)
        }
        if (masterProductNameId) {
          priceListDataObj['master_product_name_id'] = masterProductNameId
        } else {
          // throw new Error(`No Master Product Name found for Product: ${record['product_name']}`)
          errorMessages.push('No Master Name found')
        }

        // If Database options is enabled aka options.database === true
        if (options.database) {
          if (file.priceListId) {
            priceListDataObj['price_list_id'] = file.priceListId
          } else {
            throw new Error(`No price list id provided for file: ${file.fileName}`)
          }
          if (file.collectionId) {
            priceListDataObj['price_list_collection_id'] = file.collectionId
          } else {
            throw new Error(`No collection Id supplier for file: ${file.fileName}`)
          }
        }

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

        // Collect Product stats and push if no errors
        if (errorMessages.length === 0) {
          priceListDataObjs.push(priceListDataObj)
          validProducts++
        } else {
          invalidProducts++
        }
        // Push all records into error report for reupload and errors if there are any
        errorReport.push(Object.assign({}, record, { errors: errorMessages.join(', ') }))
      })
      // Add Error report if errors were found
      if (hadErrors) {
        statsObj[file.fileName].errorReport = errorReport
        filesHadErrors = true
      }
      // Add Stats to response object
      statsObj[file.fileName].validProducts = validProducts
      statsObj[file.fileName].invalidProducts = invalidProducts
    })
    return {
      statsObj: statsObj,
      priceListDataObjs: priceListDataObjs,
      filesHadErrors: filesHadErrors
    }
  })()
}

module.exports = arrangePriceListData
