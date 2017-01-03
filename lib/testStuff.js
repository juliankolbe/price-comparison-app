

const parseBonus = require('_/priceComparison/helpers/parseBonus')

let res = parseBonus.single('12+3,11+1')

console.log(res)









// const logger = require('_/logger')
// const Promise = require('bluebird')
// const bookshelf = require('_/database')
// // const MasterProductName = require('_/models/masterProductName')
// // const MasterProductNames = require('_/collections/masterProductNames')
// const SupplierProductName = require('_/models/supplierProductName')
// const Supplier = require('_/models/supplier')
//
// let start = new Date()
//
// Promise.coroutine(function * () {
//   // // Fetch required data from database
//   // let suppliers = yield Supplier.fetchAll()
//   // let supplierNameIds = suppliers.getNameIdPairs('id', 'name')
//   //
//   // let supplierProductNames = yield SupplierProductName.fetchAll()
//   // let supplierProductNameIds = supplierProductNames.getNameIdPairs('id', 'supplier_product_name')
//   // // let masterProductNames = yield MasterProductName.fetchAll({withRelated: ['supplierProductNames']})
//   // let masterProductNamesKnex = yield bookshelf.knex.select('id', 'master_product_name').from('master_product_name')
//   let supplierProductNames = yield SupplierProductName.fetchAll({withRelated: ['supplier', 'masterProductName']})
//   logger.debug(supplierProductNames.getAttributes())
// })()
// .then(() => {
//   logger.info('DB Process took: ' + (new Date() - start) + 'ms')
// })
// .catch(err => {
//   logger.info(err)
// })


// function bla () {
//   Promise.coroutine(function * () {
//     yield Promise.delay(500)
//     console.log('running')
//     return {value: 50}
//   })()
//   .then(res => {
//     return res
//   })
// }
//
// console.log(bla())
