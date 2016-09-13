const express = require('express');
const multiFileUpload = require('_/csvUpload/middleware/multiFileUpload');
const simpleParser = require('../csvHelper/csvToObject');
const logger = require('_/logger');
const SupplierProductName = require('../models/supplierProductName');
const Suppliers = require('../collections/suppliers');
const Supplier = require('../models/supplier');
const _ = require('lodash');

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


router.post('/', multiFileUpload(uploadSettings), function(req, res) {
  // Check filename, which are the corresponding supplier, with suppliernames in the database
  // Also Check for duplicates
  Supplier.fetchAll()
  .then(function(suppliers){
    let dbSupNames = suppliers.models.map(s => s.attributes.name);
    let fileSupNames = req.files.map(f => f.originalname);
    let matches = 0;
    let duplicates = 0;
    dbSupNames.forEach(dbN => {
      let counter = 0;
      var regex = new RegExp(`${dbN.toLowerCase()}`);
      logger.debug(regex);
      fileSupNames.forEach(fN => {
        if(regex.test(fN.toLowerCase())) {
          matches++;
          counter++;
        }
      });
      if(counter > 1) duplicates++;
    });
    if(matches === fileSupNames.length && !duplicates) {
      res.send('Success: File names as supplier names match!');
    }
    else if(duplicates){
      res.send(`${duplicates} duplicate file name${duplicates>1?'s':''}`);
    }
    else {
      res.send('Error: File names as supplier names do not match');
    }

    // if(_.intersection(dbSupNames, fileSupNames).length !== fileSupNames.length) {
    //   res.send('Error: File names as supplier names do not match');
    // }
    // else {
    //   res.send('Success: File names as supplier names match!');
    // }
  });
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
