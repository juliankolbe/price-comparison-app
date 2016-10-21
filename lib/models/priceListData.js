'use strict'

const Bookshelf = require('_/database')

require('./supplier')
require('./supplierProductName')
require('./priceList')
require('./priceListCollection')
var PriceListData = Bookshelf.Model.extend({
  tableName: 'price_list_data',
  hasTimeStamps: true,
  supplierProductNames () {
    return this.belongsTo('SupplierProductName')
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
