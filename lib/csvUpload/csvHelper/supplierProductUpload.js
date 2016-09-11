const csvParser = require('_/csvUpload/csvHelper/csvToObject');
const logger = require('_/logger');
const Promise = require('bluebird');
const Supplier = require('../models/supplier');
const MasterProductName = require('../models/masterProductName');



var output = [];

var settings = {
  headings: ['Medseven', 'Tamimi', 'Sharjah', 'Sultan'],
  dest: '/usr/src/app/tmp/csv/dummyMasterList2.csv',
  delimiter: ';'
};

var createTransformerCB = function(suppliers, masterProductNames) {
  var supplierIds = {};
  var masterIds = {};
  var masterAtts = masterProductNames.models.map(e=> e.attributes);
  masterAtts.forEach(e => masterIds[e['master_product_name']] = e['id']);
  var supAtts = suppliers.models.map(e=> e.attributes);
  supAtts.forEach(e => supplierIds[e.name] = e.id);
  return function transformerCB(record, callback) {
    var keyNames = Object.keys(record);
    keyNames.forEach(e => {
      if(record[e] !== '-' && supplierIds[e] && masterIds[record['Medseven']]) {
        output.push( {
          supplier_id: supplierIds[e],
          supplier_product_name: record[e],
          master_product_name_id: masterIds[record['Medseven']]
        });
      }
    });
    callback(null, 'accessing next record');
  };
};

var suppliersDB;

module.exports = Supplier.fetchAll()
.then(function(suppliers){
  suppliersDB = suppliers;
  return MasterProductName.fetchAll();
})
.then(function(masterProductNames){
  var cb = createTransformerCB(suppliersDB, masterProductNames);
  return csvParser.parseCsv(settings, cb);
})
.then(function(){
  return new Promise(function(resolve, reject){
    resolve(output);
  });
});
