const express = require('express');
const multiFileUpload = require('_/csvUpload/middleware/multiFileUpload');
const simpleParser = require('../csvHelper/csvToObject');
const logger = require('_/logger');

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
  // dest: '/usr/src/app/tmp/csv/dummyMasterList2.csv',
  delimiter: ';',
  fields: {
    Medseven:'Medseven',
    Tamimi: 'Tamimi',
    Sharjah: 'Sharjah',
    Sultan: 'Sultan'
  },
  ignores: ['-']
};

router.post('/', multiFileUpload(uploadSettings), function(req, res) {
  // Check filename, which are the corresponding supplier, with suppliernames in the database
  // Also Check for duplicates

  // PARSING
  // Set
  parseSettings.source = req.files[0].path;
  simpleParser.simpleParse(parseSettings)
  .then(function(output){
    res.send(output);
  });

  // Parse files
  // var something = req;
  // res.send(req.files);
});

router.get('/', function(req, res){
  var template = __dirname + '/../views/fileUpload';
  res.render(template);
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
