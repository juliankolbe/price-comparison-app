var Promise = require('bluebird');
var Suppliers = require('../collections/suppliers');
var Supplier = require('../models/supplier');
var logger = require('_/logger');


var suppliers = Suppliers.forge([
  {name: 'Medseven'},
  {name: 'Tamimi'},
  {name: 'Sharjah'},
  {name: 'Sultan'}

]);

suppliers.invokeThen('save')
.then(function() {
  return Supplier.fetchAll();
})
.then(function(suppliers){
  logger.debug(suppliers.models.map(e=> e.attributes));
});
