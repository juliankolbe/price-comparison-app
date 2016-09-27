const Bookshelf = require('_/database')
const SupplierProductName = require('../models/supplierProductName')

module.exports = Bookshelf.Collection.extend({
  model: SupplierProductName
})
