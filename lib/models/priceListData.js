'use strict'

const Bookshelf = require('_/database')

require('./supplierProductName')
require('./masterProductName')
require('./supplier')
require('./priceList')
require('./priceListCollection')
var PriceListData = Bookshelf.Model.extend({
  tableName: 'price_list_data',
  hasTimeStamps: true,
  supplierProductName () {
    return this.belongsTo('SupplierProductName')
  },
  masterProductName () {
    return this.belongsTo('MasterProductName')
  },
  supplier () {
    return this.belongsTo('Supplier')
  },
  priceList () {
    return this.belongsTo('PriceList')
  },
  priceListCollection () {
    return this.belongsTo('PriceListCollection')
  }
})

module.exports = Bookshelf.model('PriceListData', PriceListData)
