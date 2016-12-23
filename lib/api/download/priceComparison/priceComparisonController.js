const express = require('express')
const router = express.Router()
const Promise = require('bluebird')
const logger = require('_/logger')
const fs = Promise.promisifyAll(require('fs'))
const dbToObject = require('_/priceComparison/middleware/dbToObject')
const createCsvFile = require('_/csvUpload/middleware/createCsvFile')
const deleteTmpFiles = require('_/csvUpload/middleware/deleteTmpFiles')
const config = require('./priceComparisonConfig')
const deletefiles = require('_/util/deleteFiles.js')

router.route('/:collectionId/:stockReqId?/:afterNegId?')
  .get(
    dbToObject(),
    createCsvFile(config.downloadPath),
    (req, res) => {
      fs.readFileAsync(config.downloadPath).then(function (csv) {
        res.setHeader('Content-disposition', 'attachment; filename=testing.csv')
        res.set('Content-Type', 'text/csv')
        res.status(200).send(csv)
        res.on('finish', () => {
          deletefiles([config.downloadPath])
        })
      })
      // res.end()
      // res.download(config.csvFilePath, 'testing.csv')
    })

module.exports = router
