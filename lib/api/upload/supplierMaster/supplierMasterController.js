const express = require('express')
const multiFileUpload = require('_/csvUpload/middleware/multiFileUpload')
const csvParse = require('_/csvUpload/middleware/csvParse')
const deleteTmpFiles = require('_/csvUpload/middleware/deleteTmpFiles')
const supplierMasterDb = require('./customMiddleware/supplierMasterDb')
const config = require('./supplierMasterConfig')
const logger = require('_/logger')
const router = express.Router()

router.route('/')
  .post(
    multiFileUpload(config.uploadSettings),
    csvParse(config.parseSettings),
    deleteTmpFiles,
    supplierMasterDb,
    // save data
    (req, res, next) => {
      // logger.debug(req.parsedCsv[0])
      // logger.debug(req.parsedCsv.length)
      res.end()
    })

module.exports = router
