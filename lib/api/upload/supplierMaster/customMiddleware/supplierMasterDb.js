const SupplierProductName = require('_/models/supplierProductName')
const SupplierProductNames = require('_/collections/supplierProductNames')
const Supplier = require('_/models/supplier')
const MasterProductName = require('_/models/masterProductName')
const MasterProductNames = require('_/collections/masterProductNames')
const Promise = require('bluebird')
const logger = require('_/logger')
const _ = require('lodash')
const bookshelf = require('_/database')

// const wrapCR = require('_/util/middlewareHelper').wrapCR

// const supplierMasterDb = () => {
//   return wrapCR(function *(req, res, next) {
//     let suppliers = yield Supplier.fetchAll()
//     console.log(suppliers.getNameIdPairs())
//     // let masterProductNames = yield MasterProductName.fetchAll()
//     // let supplierProductNames = yield SupplierProductName.fetchAll()
//     // implement collection method that returns all attributes for all models
//     // extract master and supplier ids, contruct into form {suppliername: idvalue} and {masterproductname: idvalue}
//     // get csv data from request object
//     // forge collection of models with SupplierProductNames.forge(processedCsvData)
//     // save to database using supplierProductNames.invokeThen('save')
//     // Check online if that is a transaction
//     // fetchall that have been saved add to req object
//     // var supplierIds = {};
//     // var masterIds = {};
//     // var masterAtts = masterProductNames.models.map(e=> e.attributes);
//     // masterAtts.forEach(e => masterIds[e['master_product_name']] = e['id']);
//     // var supAtts = suppliers.models.map(e=> e.attributes);
//     // supAtts.forEach(e => supplierIds[e.name] = e.id);
//
//   })
// }
const supplierMasterDb = (req, res, next) => {
  Promise.coroutine(function * () {
    let suppliers = yield Supplier.fetchAll()
    let masterProductNames = yield MasterProductName.fetchAll()
    let start = new Date()
    let supplierProductNames = yield SupplierProductName.fetchAll()

    // console.log(masterProductNames.getNameIdPairs())
    // console.log(suppliers.getNameIdPairs())
    // console.log(supplierProductNames.getArrayofColumn('supplier_product_name'))

    let csvData = req.parsedCsv

    // TODO: Add functionality to Update Master Names!!
    let masterArraytoSave = []
    // Get a only master names array from csv data, and only where it actually has a value not removed by the ingores
    let mastersFromCsv = csvData.filter((record) => record['Master']).map((record) => record['Master']) || []
    // Get an array of the fetched data for the master names column
    let mastersInDb = masterProductNames.getArrayofColumn('master_product_name') || []
    // Compare both arrays to filter out those master names that already exist in the DB
    let mastersToSave = _.difference(mastersFromCsv, mastersInDb)
    // Transform the names to be saved into a format that the collection or knex can read in order to insert
    mastersToSave.forEach((e) => {
      masterArraytoSave.push({'master_product_name': e})
    })
    // Forge collection to be saved
    masterProductNames = MasterProductNames.forge(masterArraytoSave)
    // Use custom batch insert method to insert the masters to be saved and skip the default functionality which is too slow
    yield masterProductNames.batchInsert(3000)
    logger.info(mastersToSave.length + ' Master product names have been saved')

    // masterProductNames = yield MasterProductName.fetchAll()
    // After updating the masters table, fetch all master names and forge a collection
    let results = yield bookshelf.knex.select('id', 'master_product_name').from('master_product_name')
    masterProductNames = MasterProductNames.forge(results)
    // Use custom name id pair function so that ids can be gotten for each master name and supplier, needed for supplierMaster inserts
    let masterIds = masterProductNames.getNameIdPairs()
    let supplierIds = suppliers.getNameIdPairs()
    let tree = {}

    supplierProductNames.models.forEach((model) => {
      let supPN = model.attributes['supplier_product_name']
      let supID = model.attributes['supplier_id']
      if (tree[supID]) {
        tree[supID].push(supPN)
      } else {
        tree[supID] = [supPN]
      }
    })
    let supplierMasterArrayToSave = []

    // Filter out rows that do not have a master name in the sheet and those that do not have a master name in the database
    csvData.filter((record) => record['Master'] && masterIds[record['Master']])
      .forEach((record) => {
        let recordRows = []
        _.forOwn(record, (value, key) => {
          let recordRow = {}
          let duplicate = false
          if (tree[supplierIds[key]] && tree[supplierIds[key]].indexOf(value) > -1) {
            duplicate = true
          }
          // Only for products with suppliers in the database and only if that supplier does not already have such a supplier product name
          if (supplierIds[key] && !duplicate) {
            recordRow['master_product_name_id'] = masterIds[record['Master']]
            recordRow['supplier_id'] = supplierIds[key]
            recordRow['supplier_product_name'] = value
            recordRows.push(recordRow)
          }
        })
        supplierMasterArrayToSave = supplierMasterArrayToSave.concat(recordRows)
      })

    supplierProductNames = SupplierProductNames.forge(supplierMasterArrayToSave)
    yield supplierProductNames.batchInsert(3000)
    logger.info(supplierMasterArrayToSave.length + ' Supplier Product Names saved')

    logger.info('DB Process took: ' + (new Date() - start) + 'ms')
    next()
  })()
  .catch(err => {
    logger.info(err)
    res.send(err)
  })
}

module.exports = supplierMasterDb
