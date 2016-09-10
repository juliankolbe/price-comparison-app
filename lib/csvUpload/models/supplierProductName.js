'use strict';

const bookshelf = require('_/database');
const MasterProductName = require('./masterProductName');
const Supplier = require('./supplier');

module.exports = bookshelf.Model.extend({
    tableName: 'supplier_product_name',
    hasTimeStamps: true,
    supplier() {
      return this.belongsTo(Supplier);
    },
    masterProductName() {
      return this.belongsTo(MasterProductName);
    }
});
