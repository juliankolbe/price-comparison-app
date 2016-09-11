const Promise = require('bluebird');
const MasterProductNames = require('../collections/masterProductNames');
const MasterProductName = require('../models/masterProductName');
const masterListUpload = require('../csvHelper/masterListUpload');
const logger = require('_/logger');



masterListUpload.then(function(output){
  logger.debug('CSV has finished parsing, forging models now..');
  var masterProductNames = MasterProductNames.forge(output);
  logger.debug('Collection is created, saving to database now...');
  masterProductNames.invokeThen('save')
  .then(function() {
    logger.debug('All data has been saved, fetching all the data now...');
    return MasterProductName.fetchAll();
  })
  .then(function(masterProductNames){
    logger.debug(masterProductNames.models.length);
  });
});
