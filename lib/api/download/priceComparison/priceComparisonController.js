const express = require('express')
const router = express.Router()
const logger = require('_/logger')
const priceComparison = require('_/priceComparison')
// const Promise = require('bluebird')
// const fs = Promise.promisifyAll(require('fs'))
// const createCsvFile = require('_/csvUpload/middleware/createCsvFile')
// const deleteTmpFiles = require('_/csvUpload/middleware/deleteTmpFiles')
// const config = require('./priceComparisonConfig')
// const deletefiles = require('_/util/deleteFiles.js')

router.route('/:collectionId/:stockReqId?/:afterNegId?')
  .get(
    priceComparison(),
    // createCsvFile(config.downloadPath),
    (req, res, next) => {
      if (!req.outputCsv) next(new Error('No output csv available in pc controller'))
      else {
        res.setHeader('Content-disposition', 'attachment; filename=testing.csv')
        res.set('Content-Type', 'text/csv')
        res.status(200).send(req.outputCsv)
      }
      // fs.readFileAsync(config.downloadPath).then(function (csv) {
      //   res.setHeader('Content-disposition', 'attachment; filename=testing.csv')
      //   res.set('Content-Type', 'text/csv')
      //   res.status(200).send(csv)
      //   res.on('finish', () => {
      //     deletefiles([config.downloadPath])
      //   })
      // })
      // res.end()
      // res.download(config.csvFilePath, 'testing.csv')
    })

module.exports = router
