'use strict'

const Bookshelf = require('_/database')

require('./supplierProductName')
require('./priceList')
var Supplier = Bookshelf.Model.extend({
  tableName: 'supplier',
  hasTimeStamps: true,
  supplierProductNames () {
    return this.hasMany('SupplierProductName')
  },
  priceLists () {
    return this.hasMany('PriceList')
  }
})

module.exports = Bookshelf.model('Supplier', Supplier)
