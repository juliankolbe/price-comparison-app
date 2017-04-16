const bookshelf = require('_/database')
const SupplierProductName = require('_/models/supplierProductName')
const Supplier = require('_/models/supplier')
// const Promise = require('bluebird')

const DB = function ({ debug = false } = {}) {
  this.fetchPLDbyCollectionId = function (collectionId) {
    return bookshelf.knex('price_list_data AS pld')
    .leftJoin('supplier AS s', 's.id', 'pld.supplier_id')
    .leftJoin('supplier_product_name AS spn', 'spn.id', 'pld.supplier_product_name_id')
    .leftJoin('master_product_name AS mpn', 'mpn.id', 'pld.master_product_name_id')
    .where({'pld.price_list_collection_id': collectionId})
    .select(
      'pld.id',
      'pld.whole_sale_price',
      'pld.packing',
      'pld.retail_price',
      'pld.bonus',
      'pld.stock',
      'pld.bonus_1',
      'pld.bonus_2',
      'pld.expiry_date',
      'pld.bonus_3',
      'pld.agency_id',
      'pld.serial_number',
      'pld.moh_percentage',
      'pld.created_at',
      'pld.updated_at',
      's.name AS supplier_name',
      'spn.supplier_product_name',
      'mpn.master_product_name',
      'mpn.id AS master_product_name_id'
    )
    .debug(debug)
  }

  this.fetchSupplierIdNamePairs = function () {
    return Supplier.fetchAll()
    .then(suppliers => {
      return suppliers.getNameIdPairs('id', 'name')
    })
  }
  this.fetchSupplierPNIdNamePairs = function () {
    return SupplierProductName.fetchAll()
    .then(supplierProductNames => {
      return supplierProductNames.getNameIdPairs('id', 'name')
    })
  }
  this.fetchMasterPNs = function () {
    return bookshelf.knex.select('id', 'master_product_name').from('master_product_name')
    .then(masterProductNames => {
      return masterProductNames
    })
  }
  this.fetchPriceListDataByCollectionId = function (collectionId) {
    if (collectionId) {
      return bookshelf.knex.select().from('price_list_data').where({price_list_collection_id: collectionId})
      .then(priceListData => {
        if (priceListData.length < 1) throw new Error(`Collection with id = ${collectionId} not found`)
        else return priceListData
      })
    } else {
      throw new Error('No Collection id provided')
    }
  }
  this.fetchPriceListDataByPriceListIds = function (priceListIds) {
    return false
  }
}

module.exports = DB
