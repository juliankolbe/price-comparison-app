const SupplierProductNames = require('_/collections/supplierProductNames')
const Promise = require('bluebird')
const logger = require('_/logger')
// const _ = require('lodash')
const bookshelf = require('_/database')

const parseBonus = require('_/priceComparison/helpers/parseBonus')

const validateCsv = (req, res, next) => {
  Promise.coroutine(function * () {
    // *************************************************************************************************************************
    //  PRICE LIST DATA
    // *************************************************************************************************************************

    // Get access to supplier product name and master product name ids
    let results = yield bookshelf.knex.select('id', 'supplier_product_name', 'master_product_name_id').from('supplier_product_name')
    logger.debug(`SupplierProductNames: ${results.length}`)
    let supplierProductNames = SupplierProductNames.forge(results)
    let supplierProductNamesIds = supplierProductNames.getNameIdPairs('supplier_product_name', 'id')
    let masterSupplierIdMatch = supplierProductNames.getNameIdPairs('id', 'master_product_name_id')
    //
    let statsObj = {}
    let filesHadErrors = false
    let files = req.parsedCsv
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
        let errorMessages = []
        let supplierProductNameId = supplierProductNamesIds[record['product_name']]
        let masterProductNameId = masterSupplierIdMatch[supplierProductNameId]

        // *******************************************************************************************
        // Record Validation
        // *******************************************************************************************

        // Required Fields, if not present add error messages
        // Check if supplier product name exists
        if (!supplierProductNameId) {
          errorMessages.push('Supplier Product Name: not found')
          hadErrors = true
        }
        // Check if whole sale price is valid
        let wholeSaleDotToCommaPropReplacer = {}
        if (!record['whole_sale_price']) {
          errorMessages.push('Whole Sale Price: invalid')
          hadErrors = true
        } else {
          wholeSaleDotToCommaPropReplacer = { 'whole_sale_price': record['whole_sale_price'].toString().replace(/[.]/g, ',') }
        }
        // Check if supplier product name has matching master
        // if (!masterProductNameId) {
        //   // throw new Error(`No Master Product Name found for Product: ${record['product_name']}`)
        //   errorMessages.push('No Master Name found')
        //   hadErrors = true
        // }
        // Check for valid bonus
          // SINGLE BONUS
          // If bonus does match these regex, test it
        let singleBonusIgnoreRegex = /^[0\-\/]$/
        if (record['bonus'] && !singleBonusIgnoreRegex.test(record['bonus'].trim())) {
          let parsedBonus = parseBonus.single(record['bonus'])
          if (!parsedBonus.bonus_1) {
            errorMessages.push('Bonus not recognised')
            hadErrors = true
          }
        }
          // TODO: TRIPLE BONUS VALIDATION
        // *******************************************************************************************
        // Collect Product stats and push if no errors
        if (errorMessages.length === 0) {
          validProducts++
        } else {
          invalidProducts++
        }
        // Push record into error report for reupload and errors if there are any
        errorReport.push(Object.assign({}, record, { errors: errorMessages.join(', ') }, wholeSaleDotToCommaPropReplacer))
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
      filesHadErrors: filesHadErrors
    }
  })()
  .then(result => {
    if (result.fileHadErrors) {
      logger.info('Csv Validation: succeeded')
      next()
    } else {
      logger.info('Csv Validation: failed, reupload required')
      // If validation failed, due to not being valid, then send back error reports
      res.json({ success: false, data: result.statsObj })
    }
    return null
  })
  .catch(err => {
    logger.info('Csv Validation: failed due to error')
    logger.info(err)
    next(err)
  })
}

module.exports = validateCsv
