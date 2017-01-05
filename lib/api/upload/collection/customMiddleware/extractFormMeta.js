const Promise = require('bluebird')
const logger = require('_/logger')
// const _ = require('lodash')
const Supplier = require('_/models/supplier')

const extractFormMeta = (req, res, next) => {
  Promise.coroutine(function * () {
    let suppliers = yield Supplier.fetchAll()
    let supplierIds = suppliers.getNameIdPairs('name', 'id')
    let supplierNames = suppliers.getArrayofColumn('name')

    // Multer does NOT parse JSON
    let fileFormMeta = JSON.parse(req.body.data)
    req.fileFormMeta = fileFormMeta

    req.parsedCsv.forEach(file => {
      let supplierName = fileFormMeta[file.fileName].supplier
      let fileName = file.fileName
      let regex = new RegExp(supplierName, 'gi')

      // Check if supplier name exists in database
      if (!supplierNames.includes(supplierName)) {
        let err = new Error(`Supplier '${supplierName}' not found in Database`)
        throw err
      }
      // Check if supplier name is included in file name
      else if (!regex.test(fileName)) {
        let err = new Error(`Supplier name: '${supplierName}' does not match file name: '${fileName}'`)
        err.statusCode = 422
        throw err
      }
      // Add supplier id to the request file object
      file.supplierId = supplierIds[supplierName]
      file.supplierName = supplierName
      // logger.debug(req.parsedCsv)
    })
  })()
  .then(() => {
    logger.info('Meta Data extraction: succeeded')
    next()
    return null
  })
  .catch(err => {
    logger.info('Meta Data extraction: failed')
    next(err)
  })
}

module.exports = extractFormMeta
