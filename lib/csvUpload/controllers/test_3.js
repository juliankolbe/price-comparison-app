const Promise = require('bluebird');
const SupplierProductNames = require('../collections/supplierProductNames');
const SupplierProductName = require('../models/supplierProductName');
const supplierProductUpload = require('../csvHelper/supplierProductUpload');
const logger = require('_/logger');



supplierProductUpload.then(function(output){
  logger.debug('CSV has finished parsing, forging models now..');
  var supplierProductNames = SupplierProductNames.forge(output);
  logger.debug('Collection is created, saving to database now...');
  supplierProductNames.invokeThen('save')
  .then(function() {
    logger.debug('All data has been saved, fetching all the data now...');
    return SupplierProductName.fetchAll();
  })
  .then(function(supplierProductNames){
    logger.debug(supplierProductNames.models.length);
  });
});
