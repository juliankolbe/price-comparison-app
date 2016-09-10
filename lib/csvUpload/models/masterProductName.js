'use strict';

const bookshelf = require('_/database');
const SupplierProductName = require('./supplierProductName');

module.exports = bookshelf.Model.extend({
    tableName: 'master_product_name',
    hasTimeStamps: true,
    supplierProductNames() {
      return this.hasMany(SupplierProductName);
    }
});
