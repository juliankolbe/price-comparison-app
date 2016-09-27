const express = require('express');
const multiFileUpload = require('_/csvUpload/middleware/multiFileUpload');
const simpleParser = require('../csvHelper/csvToObject');
const logger = require('_/logger');
const SupplierProductName = require('../models/supplierProductName');
const MasterProductName = require('../models/masterProductName');
// const Suppliers = require('../collections/suppliers');
const Supplier = require('../models/supplier');
const _ = require('lodash');
const fileNameCheck = require('../middleware/fileNameCheck');
const Promise = require('bluebird');

const fs = Promise.promisifyAll(require('fs'));

var router = express.Router();

var uploadSettings =
{
  destination: '/usr/src/app/tmp/csv',
  fileName: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ '.csv');
  },
  fieldName: 'csvFiles',
  maxFiles: 20,
  seperateFiles: false // not implemented
};

var parseSettings =
{
  headings: ['Medseven', 'Tamimi', 'Sharjah', 'Sultan'],
  delimiter: ';',
  fields: {
    Medseven:'Medseven',
    Tamimi: 'Tamimi',
    Sharjah: 'Sharjah',
    Sultan: 'Sultan'
  },
  ignores: ['-']
};

var suppliersMock =
[
  {name: 'test1'},
  {name: 'test2'},
  {name: 'test3'},
  {name: 'test4'}
];


router.post('/',
  multiFileUpload(uploadSettings),
  // fileNameCheck,
  function(req, res) {
  // Check filename, which are the corresponding supplier, with suppliernames in the database
  // Also Check for duplicates

  var reqss = req
  res.send('Success');

    // if(_.intersection(dbSupNames, fileSupNames).length !== fileSupNames.length) {
    //   res.send('Error: File names as supplier names do not match');
    // }
    // else {
    //   res.send('Success: File names as supplier names match!');
    // }
  // PARSING
  // Set
  // parseSettings.source = req.files[0].path;
  // simpleParser.simpleParse(parseSettings)
  // .then(function(output){
  //   let suppliers = Suppliers.forge(suppliersMock);
  //   suppliers.invokeThen('save');
  //   res.send(output);
  // });

  //

  // var something = req;
  // res.send(req.files);
});

router.get('/tape', function(req, res){
  res.status(200).json('zed');
});




router.get('/testo', function(req, res){
  MasterProductName.where('id', 9709).fetch({withRelated: ['supplierProductNames']})
  .then(function(masterProductName){
    res.send(masterProductName);
  });
});

router.get('/download', function(req, res){
  fs.readFileAsync('/usr/src/app/tmp/csv/csvFiles-1473654058795.csv').then(function(csv) {
    res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
  });
});

router.get('/', function(req, res){
  var template = __dirname + '/../views/fileUpload';
  res.render(template);
});

router.get('/test', function(req, res){
  SupplierProductName.fetchAll({withRelated: ['masterProductName', 'supplier']})
  .then(function(supplierProductNames){
    var bla = supplierProductNames;
    var stophere = 'hahah';
    res.send(supplierProductNames);
  });
});

//
// router.post('/master', function(req, res){
//
// });
//
// router.post('/supplier', function(req, res){
//
// });
//
// router.post('/supplier', function(req, res){
//
// });

module.exports = router;
