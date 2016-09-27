'use strict';

const Bookshelf = require('_/database');

require('./supplierProductName');
var Supplier = Bookshelf.Model.extend({
    tableName: 'supplier',
    hasTimeStamps: true,
    supplierProductNames() {
      return this.hasMany('SupplierProductName');
    }
});


// module.exports = Bookshelf.model('Supplier', Supplier);
