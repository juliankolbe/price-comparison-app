var express = require('express');
var multer = require('multer');

var upload = multer();
var router = express.Router();

var storage = multer.diskStorage({
  destination: '/usr/src/app/tmp/csv',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ '.csv');
  }
});

//Add fileFilter

var upload = multer({ storage: storage });

router.get('/', function(req, res){
  var template = __dirname + '/../views/fileUpload';
  res.render(template);
});

router.post('/', upload.array('csvFiles', 20), function(req, res) {
  var something = req;
  res.send(req.files);
});


module.exports = router;
