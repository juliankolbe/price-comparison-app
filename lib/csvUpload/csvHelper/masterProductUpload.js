const csvParser = require('_/csvUpload/csvHelper/csvToObject');
const logger = require('_/logger');
const Promise = require('bluebird');
const MasterProductName = require('../models/masterProductName');



var output = [];

var settings = {
  headings: ['Medseven', 'Tamimi', 'Sharjah', 'Sultan'],
  dest: '/usr/src/app/tmp/csv/dummyMasterList2.csv',
  delimiter: ';'
};

var createTransformerCB = function() {
  return function transformerCB(record, callback) {
    if(record['Medseven'] !== '-') {
      output.push({master_product_name: record['Medseven']});
    }
    callback(null, 'accessing next record');
  };
};

module.exports = csvParser.parseCsv(settings, createTransformerCB())
.then(function(){
  return new Promise(function(resolve, reject){
    resolve(output);
  });
});
