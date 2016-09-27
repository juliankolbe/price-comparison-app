'use strict'

const Bookshelf = require('_/database')

require('./supplierProductName')
var MasterProductName = Bookshelf.Model.extend({
  tableName: 'master_product_name',
  hasTimeStamps: true,
  supplierProductNames () {
    return this.hasMany('SupplierProductName')
  }
})

module.exports = Bookshelf.model('MasterProductName', MasterProductName)
