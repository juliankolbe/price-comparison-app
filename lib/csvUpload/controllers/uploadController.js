var express = require('express');
var multiFileUpload = require('_/csvUpload/middleware/multiFileUpload');

// var multer = require('multer');
//
// var upload = multer();
var router = express.Router();

// var storage = multer.diskStorage({
//   destination: '/usr/src/app/tmp/csv',
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now()+ '.csv');
//   }
// });

var settings =
{
  destination: '/usr/src/app/tmp/csv',
  fileName: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ '.csv');
  },
  fieldName: 'csvFiles',
  maxFiles: 20
}

router.post('/', multiFileUpload(settings), function(req, res) {
  var something = req;
  res.send(req.files);
});





//Add fileFilter
//
// var upload = multer({ storage: storage });

router.get('/', function(req, res){
  var template = __dirname + '/../views/fileUpload';
  res.render(template);
});

// router.post('/', upload.array('csvFiles', 20), function(req, res) {
//   var something = req;
//   res.send(req.files);
// });
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
