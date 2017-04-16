const assert = require('assert')
// const _ = require('lodash')
// const pcConfig = require('../pcConfig')
// const currencyDotToComma = require('../helpers/currencyDotToComma')
// const parseBonus = require('../helpers/parseBonus')
// const pcFormula = require('../helpers/pcFormula')
const Promise = require('bluebird')

const ArrangeProcess = function ({ db, baseArranger, stockRequestArranger, afterNegoArranger }) {
  assert(db, 'Requires db instance')
  assert(baseArranger, 'Requires a base pc arranger')

  this.getPriceListData = function ({ collectionId, priceListIds }) {
    return Promise.coroutine(function * () {
      let priceListData
      if (collectionId) {
        // if (!Number.isInteger(parseFloat(collectionId)) throw new TypeError('collectionId is not an integer')
        assert(Number.isInteger(parseFloat(collectionId)), 'collectionId is not an integer or string of an integer')
        priceListData = yield db.fetchPriceListDataByCollectionId(collectionId)
      }
      else if (priceListIds) priceListData = yield db.fetchPriceListDataByPriceListIds(priceListIds)
      else throw new Error('No way of retrieving price list data was supplied')
      return priceListData
    })()
  }

  this.getBasePC = function (priceListData) {
    assert(priceListData, 'Requires price list data')
    return Promise.coroutine(function * () {
      let supplierNameIds = yield db.fetchSupplierIdNamePairs()
      let supplierProductNameIds = yield db.fetchSupplierPNIdNamePairs()
      let masterProductNamesKnex = yield db.fetchMasterPNs()
      let records = baseArranger({ priceListData, supplierNameIds, supplierProductNameIds, masterProductNamesKnex })
      return records
    })()
  }

  this.getStockRequest = function (basePC) {
    assert(stockRequestArranger, 'Requires an stock request arranger')
    return false
  }

  this.getAfterNegotiations = function (basePC) {
    assert(afterNegoArranger, 'Requires an after negotiation arranger')
    return false
  }
}

module.exports = ArrangeProcess
