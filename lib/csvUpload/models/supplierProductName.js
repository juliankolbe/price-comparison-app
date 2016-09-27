'use strict';

const Bookshelf = require('_/database');

require('./masterProductName');
require('./supplier');
var SupplierProductName = Bookshelf.Model.extend({
    tableName: 'supplier_product_name',
    hasTimeStamps: true,
    supplier() {
      return this.belongsTo('Supplier');
    },
    masterProductName() {
      return this.belongsTo('MasterProductName');
    }
});

// module.exports = Bookshelf.model('SupplierProductName', SupplierProductName);
