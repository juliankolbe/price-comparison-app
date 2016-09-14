const Supplier = require('../models/supplier');
const logger = require('_/logger');

function fileNameCheck(req, res, next) {
  Supplier.fetchAll()
  .then(function(suppliers){
    let dbSupNames = suppliers.models.map(s => s.attributes.name);
    let fileSupNames = req.files.map(f => f.originalname);
    let matches = 0;
    let duplicates = 0;
    dbSupNames.forEach(dbN => {
      let matchCounter = 0;
      var regex = new RegExp(`${dbN.toLowerCase()}`);
      fileSupNames.forEach(fN => {
        if(regex.test(fN.toLowerCase())) {
          matches++;
          matchCounter++;
        }
      });
      if(matchCounter > 1) duplicates++;
    });
    if(matches !== fileSupNames.length) {
      res.send('Error: File names as supplier names do not match');
      return;
    }
    else if(duplicates){
      res.send(`${duplicates} duplicate file name${duplicates>1?'s':''}`);
      return;
    }
    logger.info('File names match supplier names in database');
    next();
  });
}

module.exports = fileNameCheck;
