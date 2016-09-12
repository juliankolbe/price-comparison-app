const Promise = require('bluebird');
const fs = require('fs');
const logger = require('_/logger');
const parse = require('csv-parse');
const transform = require('stream-transform');

var output = [];

module.exports = function() {

  function simpleParse(settings) {
    return parseCsv(settings, createTransformerCB(settings));
  }

  function parseCsv(settings, cb) {
    var input = fs.createReadStream(settings.source);
    var parser = parse({delimiter: settings.delimiter, trim: true, columns: () => settings.headings});
    var transformer = transform(cb, {parallel: 10, consume: true});
    input.pipe(parser).pipe(transformer);

    return new Promise(function(resolve, reject){
      transformer.on('finish', () =>{
        resolve(output);
      });
      transformer.on('error', () =>{
        reject();
      });
    });
  }

  function createTransformerCB(settings) {
    let ignores = settings.ignores || [];
    let fields = settings.fields;
    return function transformerCB(record, callback) {
      var outputRow = {};
      var headings = Object.keys(record);
      headings.forEach(heading => {
        var ignore = false;
        if(ignores.indexOf(record[heading]) !== -1) {
          ignore = true;
        }
        if(fields[heading] && !ignore) {
          outputRow[fields[heading]] = record[heading];
          // output.push({ [fields[heading]] : [record[heading]] });
        }
      });
      output.push(outputRow);
      callback(null, 'accessing next record');
    };
  }

  return {
    simpleParse: simpleParse,
    parseCsv: parseCsv,
    createTransformerCB: createTransformerCB
  };

}();