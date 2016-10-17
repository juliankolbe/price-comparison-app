const express = require('express')
const multiFileUpload = require('_/csvUpload/middleware/multiFileUpload')
const csvParse = require('_/csvUpload/middleware/csvParse')
const deleteTmpFiles = require('_/csvUpload/middleware/deleteTmpFiles')
const config = require('./collectionConfig')
const logger = require('_/logger')
const router = express.Router()

router.route('/')
  .post(
    multiFileUpload(config.uploadSettings),
    csvParse(config.parseSettings),
    deleteTmpFiles,
    // save data
    (req, res, next) => {
      // logger.debug(req.parsedCsv)
      res.end()
    })

module.exports = router
