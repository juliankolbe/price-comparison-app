const Promise = require('bluebird');
const MasterProductNames = require('../collections/masterProductNames');
const MasterProductName = require('../models/masterProductName');
// const masterProductUpload = require('../csvHelper/masterProductUpload');
const logger = require('_/logger');
const simpleParse = require('../csvHelper/csvToObject').simpleParse;
// const simpleParse = require('../csvHelper/simpleParse');


var settings = {
  headings: ['Medseven', 'Tamimi', 'Sharjah', 'Sultan'],
  source: '/usr/src/app/tmp/csv/dummyMasterList2.csv',
  delimiter: ';',
  fields: {Medseven:'master_product_name'},
  ignores: ['-']
};

var start = new Date();

simpleParse(settings).then(function(output){
  logger.debug((new Date() - start)+' ms');
  logger.debug('PARSED');
  logger.debug(output.length);
  logger.debug(output[0]);
})
.catch(e =>{
  logger.info('Parse Error');
  throw e;
});


// masterProductUpload.then(function(output){
//   // logger.debug((new Date() - start)+'ms');
//   logger.debug('PARSED');
//   logger.debug(output.length);
//   logger.debug(output[0]);
// });

// masterProductUpload.then(function(output){
//
//   logger.debug('CSV has finished parsing, forging models now..');
//
//   var masterProductNames = MasterProductNames.forge(output);
//
//   logger.debug('Collection is created, saving to database now...');
//
//   masterProductNames.invokeThen('save')
//   .then(function(){
//     logger.debug('All data has been saved!');
//   })
//   .catch( e =>{
//     throw e;
//   });
// });
