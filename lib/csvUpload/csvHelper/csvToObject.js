const Promise = require('bluebird')
const fs = require('fs')
// const logger = require('_/logger')
const parse = require('csv-parse')
const transform = require('stream-transform')
const logger = require('_/logger')
const _ = require('lodash')
const parseDate = require('_/util/converter').parseDate

module.exports = (function () {
  let csv
  let output

  function simpleParse (settings, finalOutput) {
    // csv data from file will be pushed in here, rows into objects
    csv = []
    // will contain meta data about the file as well as the csv data
    output = {}
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
        // Set final settings and csv data
        output.fileName = settings.fileName
        output.csv = csv
        // finalOutput.push(obj)
        resolve(output)
      })
      transformer.on('error', (err) => {
        reject(err)
      })
    })
  }

  function createTransformerCB (settings) {
    // ******************************************************************************************************************************
    //  CSV FILE RELEVANT VARIABLE DECLARATION
    // *******************************************************************************************************************************
    // let ignores = settings.ignores || []
    let conversions = settings.conversions || null
    let lowerConversions = conversions ? _.transform(conversions, (result, val, key) => { result[key.toLowerCase()] = val }, {}) : null
    let fields = settings.fields || null
    let lowerFields = fields ? _.transform(fields, (result, val, key) => { result[key.toLowerCase()] = val }, {}) : null
    let requiredHeadings = settings.requiredHeadings ? settings.requiredHeadings.map(heading => heading.toLowerCase()) : []
    let validHeadings = settings.validHeadings ? settings.validHeadings.map(heading => heading.toLowerCase()) : []
    let recordCounter = 0

    return function transformerCB (record, callback) {
      // ******************************************************************************************************************************
      //  RECORD RELEVANT VARIABLE DECLARATION
      // *******************************************************************************************************************************
      let errMessage = ''
      let passed = true
      let skipRecord = false
      let csvHeadings = Object.keys(record).map(heading => heading.toLowerCase())
      let originalHeadings = Object.keys(record)
      let lowerRecord = _.transform(record, (result, val, key) => { result[key.toLowerCase()] = val }, {})
      let finalRecordObj = Object.assign({}, lowerRecord)

      // ******************************************************************************************************************************
      //  CSV VALIDATION
      // *******************************************************************************************************************************

      // NOTE: Some checks should only run once

      // Check for required headings
      let reqIntersection = _.intersection(requiredHeadings, csvHeadings)
      if (reqIntersection.length !== requiredHeadings.length) {
        passed = false
        errMessage = 'Required Column Headings Missing in file: ' + settings.fileName
      }
      // check only if didnt already fail
      if (passed && recordCounter < 1) {
        // Check for invalid headings, implies check for valid amount of columns
        let validDifference = _.difference(csvHeadings, validHeadings)
        if (validDifference.length > 0) {
          let invalidHeadingsString = validDifference.map(heading => `<${heading}>`).join(', ')
          passed = false
          errMessage = `Invalid Column Headings: ${invalidHeadingsString}`
        }
        // Add meta stats about file
        let optionalOnlyHeadings = _.difference(validHeadings, requiredHeadings)
        optionalOnlyHeadings.forEach((heading) => {
          if (csvHeadings.indexOf(heading) > -1) {
            output[heading] = true
          } else {
            output[heading] = false
          }
        })
      }

      // Skip rows with required fields empty
      let emptyCounter = 0
      csvHeadings.forEach((h) => {
        // NOTE: Maybe force Error here
        if (requiredHeadings.indexOf(h) > -1 && lowerRecord[h] === '') {
          skipRecord = true
        }
        if (lowerRecord[h] === '') {
          emptyCounter++
        }
      })
      // Skip empty Records
      if (emptyCounter === csvHeadings.length) {
        skipRecord = true
      }

      // ******************************************************************************************************************************
      //  CSV TRANSFORMATION AND CONVERSION
      // *******************************************************************************************************************************

      if (passed && !skipRecord) {
        // CONVERSIONS
        if (conversions) {
          let conversionIntersection = _.intersection(Object.keys(lowerConversions), csvHeadings)

          conversionIntersection.forEach(heading => {
            let converted = false
            let convertedValue
            let value = lowerRecord[heading]
            let type = lowerConversions[heading]

            // Conversion Types
            if (type === 'toFloat') {
              let currentValue = value
              // Test for comma style currency notation
              if (/[,]/g.test(value)) {
                currentValue = value.replace(/[,]/g, '.')
              }
              convertedValue = parseFloat(currentValue)
              if (!isNaN(convertedValue)) {
                converted = true
              }
            } else if (type === 'toInt') {
              convertedValue = parseInt(value, 10)
              if (!isNaN(convertedValue)) {
                converted = true
              }
            } else if (type === 'toDate') {
              // let currentValue = value.replace(/[.]/g, ' ')
              convertedValue = parseDate(value)
              if (convertedValue !== null) {
                converted = true
              }
            }
            // If value converted sucessfully overwrite old value, otherwise remove property entirely
            if (converted) {
              finalRecordObj[heading] = convertedValue
            } else {
              // logger.debug(`Deleted "${value}" with Heading: "${heading}", from "${settings.fileName}"`)
              delete finalRecordObj[heading]
            }
          })
        }

        // TRANSFORMATIONS
        // if fields is set, transform record keys to what they are set in fields
        if (passed && fields && !skipRecord) {
          let renamedObj = {}
          _.forOwn(finalRecordObj, (value, heading) => {
            if (lowerFields[heading]) {
              renamedObj[lowerFields[heading]] = value
            } else {
              passed = false
              errMessage = 'Csv Heading has no field name assigned'
            }
          })
          finalRecordObj = renamedObj
        }
      }
      // ******************************************************************************************************************************
      //  FINAL ACTIONS
      // *******************************************************************************************************************************
      if (passed && finalRecordObj && !skipRecord) {
        csv.push(finalRecordObj)
      }
      if (!passed) {
        let err = new Error(errMessage)
        callback(err, 'Parse Error Occured - Jul')
      } else {
        callback(null, 'accessing next record')
      }
      recordCounter++
    }
  }

  return {
    simpleParse: simpleParse,
    parseCsv: parseCsv,
    createTransformerCB: createTransformerCB
  }
})()
