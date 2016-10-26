const express = require('express')
const router = express.Router()
const Promise = require('bluebird')
const logger = require('_/logger')
const fs = Promise.promisifyAll(require('fs'))
const dbToObject = require('_/priceComparison/middleware/dbToObject')
const createCsvFile = require('_/csvUpload/middleware/createCsvFile')
const config = require('./priceComparisonConfig')

router.route('/')
  .get(
    dbToObject(),
    createCsvFile(config.csvFilePath),
    (req, res) => {
      fs.readFileAsync(config.csvFilePath).then(function (csv) {
        res.setHeader('Content-disposition', 'attachment; filename=testing.csv')
        res.set('Content-Type', 'text/csv')
        res.status(200).send(csv)
      })
      // res.end()
    })

module.exports = router
