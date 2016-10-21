// const SupplierProductName = require('_/models/supplierProductName')
// const SupplierProductNames = require('_/collections/supplierProductNames')
const Supplier = require('_/models/supplier')
// const MasterProductName = require('_/models/masterProductName')
// const MasterProductNames = require('_/collections/masterProductNames')
const PriceListCollection = require('_/models/priceListCollection')
const PriceLists = require('_/collections/priceLists')
const PriceList = require('_/models/priceList')
const Promise = require('bluebird')
const logger = require('_/logger')
const _ = require('lodash')
const bookshelf = require('_/database')

const collectionDb = (req, res, next) => {
  Promise.coroutine(function * () {
    // t is the transaction (or the transaction object I think)
    yield bookshelf.transaction(Promise.coroutine(function * (t) {
      let start = new Date()
      // *************************************************************************************************************************
      //  VARIABLES
      // *************************************************************************************************************************
      let mockDatedAt = '2016-09-18'
      // logger.debug(req.parsedCsv)
      let collectionId
      let files = req.parsedCsv
      // Multer does NOT parse JSON
      let fileFormMeta = JSON.parse(req.body.data)
      // logger.debug(req.body.data)
      // *************************************************************************************************************************
      //  PRICE LIST COLLECTION
      // *************************************************************************************************************************

      // Object for entire Collection to be saved
      // External data needed:  userid
      let numberOfLists = files.length
      let priceListCollectionObj = {'number_of_lists': numberOfLists, 'dated_at': mockDatedAt}
      let savedCollection = yield PriceListCollection.forge(priceListCollectionObj).save(null, {transacting: t})
      collectionId = savedCollection.attributes.id

      // *************************************************************************************************************************
      //  PRICE LISTS
      // *************************************************************************************************************************

      // Pricelist Object for each file uploaded
      // External data needed: supplierid, collecionid
      // Returns array of objects, with ids and filename to identy which list its for

      // Get access to supplier ids
      let suppliers = yield Supplier.fetchAll()
      let supplierIds = suppliers.getNameIdPairs()
      let lowerSupplierIds = _.transform(supplierIds, (result, val, key) => { result[key.toLowerCase()] = val }, {})

      let priceListObjs = []
      files.forEach(file => {
        let priceListObj = {}
        // Foreign Keys
        priceListObj['supplier_id'] = supplierIds[fileFormMeta[file.fileName].supplier]
        priceListObj['price_list_collection_id'] = collectionId
        // Pricelist meta data
        priceListObj['has_retail_price'] = file['retail price']
        priceListObj['has_triple_bonus'] = file['bonus1'] && file['bonus2'] && file['bonus3']
        priceListObj['has_bonus'] = file.bonus
        priceListObj['has_expiry_date'] = file['expiry date']
        priceListObj['has_stock'] = file.stock
        // priceListObj['has_stock'] = 'asdsadasdasd' // Force Error
        priceListObj['dated_at'] = mockDatedAt
        priceListObj['file_name'] = file.fileName
        priceListObj['number_of_products'] = file.csv.length

        priceListObjs.push(priceListObj)
      })
      // logger.debug(priceListObjs)
      let savedPriceLists = yield PriceLists.forge(priceListObjs).invokeThen('save', null, {transacting: t})

      // supplierProductNames = SupplierProductNames.forge(supplierMasterArrayToSave)
      // yield supplierProductNames.batchInsert(3000)
      // let priceListIds = savedPriceLists.getNameIdPairs()

      // Get access to priceList ids that were just saved, by filename as its the only thing linking it to the local array
      let priceListIds = {}
      savedPriceLists.forEach(list => {
        let atts = list.attributes
        priceListIds[atts['file_name']] = atts.id
      })
      logger.debug(priceListIds)
      // let selectedPriceLists = yield PriceList.where({price_list_collection_id: collectionId}).fetchAll({withRelated: ['supplier', 'priceListCollection']})
      // logger.debug(selectedPriceLists)

      // *************************************************************************************************************************
      //  PRICE LIST DATA
      // *************************************************************************************************************************

      // Price list data object for each product uploaded
      // External data needed: suppplierid, collectionid, pricelistid, supplierproductnameid,..



      logger.info('DB Process took: ' + (new Date() - start) + 'ms')
    }))
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

module.exports = collectionDb
