var uploadController = require('./controllers/uploadController');


var csvUpload = function() {
  return {
    controllers: {
      uploadController: uploadController
    }
  };
}();

module.exports = csvUpload;
