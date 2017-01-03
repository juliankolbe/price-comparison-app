const express = require('express')

const multiFileUpload = require('_/csvUpload/middleware/multiFileUpload')
const csvParse = require('_/csvUpload/middleware/csvParse')
const deleteTmpFiles = require('_/csvUpload/middleware/deleteTmpFiles')
const createCsvFile = require('_/csvUpload/middleware/createCsvFile')
const collectionDb = require('./customMiddleware/collectionDb')
const extractFormMeta = require('./customMiddleware/extractFormMeta')
const validateCsv = require('./customMiddleware/validateCsv')

const priceComparisonConfig = require('_/config').priceComparison
const config = require('./collectionConfig')
const logger = require('_/logger')
const router = express.Router()

router.route('/')
  .post(
    multiFileUpload(config.uploadSettings),
    csvParse(config.parseSettings),
    deleteTmpFiles,
    extractFormMeta,
    validateCsv,
    collectionDb,
    (req, res, next) => {
      // logger.debug(req.parsedCsv)
      logger.info('collectionController: Response Sent')
      res.end()
    })

// Route for downloading the price comparison without saving to the database
router.route('/download')
  .post(
    multiFileUpload(config.uploadSettings),
    csvParse(config.parseSettings),
    deleteTmpFiles,
    // TODO: arrangeCsvMiddleware
    createCsvFile(priceComparisonConfig.downloadPath),
    (req, res, next) => {
      // logger.debug(req.parsedCsv)
      logger.info('collectionController: Response Sent')
      res.end()
    })

module.exports = router
