//*******************************************************************************************************************************
//    Multiple File upload via Multer
//*******************************************************************************************************************************
//  Takes a settings object with the following properties:
//  {
//    destination : string/function - file destination as a string (the folder it should go in) e.g.: '/usr/src/app/tmp/csv'
//                                - file destination as a function e.g.: function (req, file, cb) {
//                                                                         cb(null, '/usr/src/app/tmp/csv');
//                                                                       }
//    fileName    : function - name of the file at the destination e.g.: function (req, file, cb) {
//                                                                         cb(null, file.fieldname + '-' + Date.now())+ '.csv';
//                                                                     }
//    fieldName   : string - name of the html form field that takes the files as input e.g.: 'csvFiles'
//    maxFiles    : number - maximum amount of files to be allowed to be uploaded with one request e.g.: 20
//  }
//
//  NOTE: form needs to have this attribute: enctype="multipart/form-data" for multer to work
//
//  To be added: file filter
//
//*******************************************************************************************************************************

var multer = require('multer');

function multiFileUpload(settings) {

  var storage = multer.diskStorage({
    destination: settings.destination,
    filename: settings.fileName
  });

  var upload = multer({ storage: storage });

  return upload.array(settings.fieldName, settings.maxFiles);
}

module.exports = multiFileUpload;
