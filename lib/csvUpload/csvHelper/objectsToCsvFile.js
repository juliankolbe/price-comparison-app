const stringify = require('csv-stringify')
const fs = require('fs')
const through2 = require('through2')
const Promise = require('bluebird')
const logger = require('_/logger')

const createCsvFile = (columns, rows, path) => {
  return new Promise(function (resolve, reject) {
    if (!columns) {
      reject(new Error('Csv File Columns are not set'))
    } else if (!rows) {
      reject(new Error('Csv File Rows are not set'))
    } else if (!path) {
      reject(new Error('Csv File Path is not set'))
    }

    let stringifier = stringify({ header: true, columns: columns, delimiter: ';' })
    stringifier.on('error', err => {
      reject(err)
    })

    let output = fs.createWriteStream(path)
    output.on('error', err => {
      reject(err)
    })
    output.on('finish', () => {
      resolve()
    })

    let objectStream = through2.obj(function (chunk, encoding, callback) {
      this.push(chunk)
      callback()
    })
    objectStream.on('error', err => {
      reject(err)
    })

    objectStream.pipe(stringifier).pipe(output)
    rows.forEach(obj => {
      objectStream.write(obj)
    })
    objectStream.end()
  })
}

module.exports = createCsvFile
