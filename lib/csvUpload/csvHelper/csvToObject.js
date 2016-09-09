const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const logger = require('_/logger');
const parse = require('csv-parse');
const transform = require('stream-transform');

// MOCKING

var tamimiMasterList = {
  "21 CEN PRENATAL TAB 60\"S": "21 CEN PRENATAL TAB 60\"S",
  "prod2": "maser_prod_name_2"
};

var medsevenMasterList = {
  "21 CEN PRNATAL TAB 60\"S": "21 CEN PRENATAL TAB 60\"S",
  "prod2": "maser_prod_name_2"
};

var fileList = [
  {supplier: 'Al Tamimi', source: '/usr/src/app/tmp/csv/phaTest2.csv', delimiter: ';'},
  {supplier: 'Medseven', source: '/usr/src/app/tmp/csv/phaTest3.csv', delimiter: ';'}
];


//input

// file destination
// headers
// delimiter
// transformer callback





// Acutal Code
var finalList = {};

var counter = 0;

var files = fileList.map(streamList);

Promise.all(files)
.then(function() {
  logger.debug(counter);
})
.catch(e => {
  throw e;
});

// Called for every filed uploaded
function streamList(file) {
  // Async call to Database fetching masterlist for the supplier
  var medsevenMasterList = {
    "21 CEN PRNATAL TAB 60\"S": "21 CEN PRENATAL TAB 60\"S",
    "prod2": "maser_prod_name_2"
  };

  var input = fs.createReadStream(file.source);
  var parser = parse({delimiter: ';', trim: true, columns: () => ['productName','price','expireDate','stock']});
  var transformer = transform(transformerCallBack(file.supplier), {parallel: 10, consume: true});
  input.pipe(parser).pipe(transformer);

  return new Promise(function(resolve, reject){
    transformer.on('finish', () =>{
      resolve();
    });
    transformer.on('error', () =>{
      reject();
    });
  });
}
// Operations done on every record from a uploaded csv file
function transformerCallBack(supplierName) {
  return function(record, callback){
      counter++;
      record.supplierName = supplierName;
      logger.debug(record);
      callback(null,'hi-');
  };
}
