const Promise = require('bluebird');
const fs = require('fs');
const logger = require('_/logger');
const parse = require('csv-parse');
const transform = require('stream-transform');


module.exports = function() {

  function parseCsv(settings, cb) {
    var input = fs.createReadStream(settings.dest);
    var parser = parse({delimiter: settings.delimiter, trim: true, columns: () => settings.headings});
    var transformer = transform(cb, {parallel: 10, consume: true});
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

  return {
    parseCsv: parseCsv
  };

}();
