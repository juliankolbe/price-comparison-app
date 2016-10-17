const Promise = require('bluebird')
const fs = require('fs')
// const logger = require('_/logger')
const parse = require('csv-parse')
const transform = require('stream-transform')
const logger = require('_/logger')
const _ = require('lodash')

module.exports = (function () {
  let output

  function simpleParse (settings, finalOutput) {
    output = []
    return parseCsv(settings, createTransformerCB(settings), finalOutput)
  }

  function parseCsv (settings, cb, finalOutput) {
    var input = fs.createReadStream(settings.source)
    //, relax_column_count: true
    // var parser = parse({delimiter: settings.delimiter, trim: true, columns: () => settings.headings, skip_empty_lines: true})
    var parser = parse({delimiter: settings.delimiter, trim: true, columns: true, skip_empty_lines: true})
    var transformer = transform(cb, {parallel: 10, consume: true})
    input.pipe(parser).pipe(transformer)

    return new Promise(function (resolve, reject) {
      transformer.on('finish', () => {
        let obj = {[settings.fileName]: output}
        // finalOutput.push(obj)
        resolve(obj)
      })
      transformer.on('error', (err) => {
        reject(err)
      })
    })
  }

  function createTransformerCB (settings) {
    // let ignores = settings.ignores || []
    // let fields = settings.fields || null
    let requiredHeadings = settings.requiredHeadings || []
    let validHeadings = settings.validHeadings || []
    let counter = 0

    return function transformerCB (record, callback) {
      // let outputRow = {}
      let errMessage = ''
      let passed = true
      let skipRecord = false
      let csvHeadings = Object.keys(record)
      // var skip = false
      if (counter < 1) {
        // logger.debug(record)
        counter++
      }
      // Check for required headings
      let reqIntersection = _.intersection(requiredHeadings, csvHeadings)
      if (reqIntersection.length !== requiredHeadings.length) {
        passed = false
        errMessage = 'Required Column Headings Missing'
      }
      // Check for invalid headings, implies check for valid amount of columns
      let validDifference = _.difference(csvHeadings, validHeadings)
      if (validDifference.length > 0) {
        passed = false
        errMessage = 'Invalid Column Headings'
      }
      // // Check for duplicate headings
      // let uniqCheck = _.uniq(csvHeadings)
      // if (uniqCheck.length !== csvHeadings.length) {
      //   passed = false
      //   errMessage = 'Duplicate Column Headings'
      // }
      // Skip rows with required fields empty
      let emptyCounter = 0
      csvHeadings.forEach((h) => {
        // NOTE: Maybe force Error here
        if (requiredHeadings.indexOf(h) > -1 && record[h] === '') {
          skipRecord = true
        }
        if (record[h] === '') {
          emptyCounter++
        }
      })
      // Skip empty Records
      if (emptyCounter === csvHeadings.length) {
        skipRecord = true
      }
      // Arrange rows into the correct object format
      // csvHeadings.forEach(heading => {
      //   let ignore = false
      //   // Check if value in ignore list
      //   if (ignores.indexOf(record[heading]) !== -1) {
      //     ignore = true
      //   }
      //   if (!ignore) {
      //     // If fields are set, use them as object keys, else use headings as keys
      //     if (fields && fields[heading]) {
      //       outputRow[fields[heading]] = record[heading]
      //     } else {
      //       outputRow[heading] = record[heading]
      //     }
      //   }
      // })
      if (!skipRecord) {
        output.push(record)
      }
      if (!passed) {
        let err = new Error(errMessage)
        callback(err, 'Parse Error Occured - Jul')
      } else {
        callback(null, 'accessing next record')
      }
    }
  }

  return {
    simpleParse: simpleParse,
    parseCsv: parseCsv,
    createTransformerCB: createTransformerCB
  }
})()
