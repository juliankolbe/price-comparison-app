const express = require('express')
const logger = require('_/logger')

const uploadController = require('./upload')
const downloadController = require('./download')
const supplierController = require('./supplier')
const collectionController = require('./collection')

const router = express.Router()

// API routes

// router.use('/pricelist', require pricelist router);

router.use('/upload', uploadController)
router.use('/download', downloadController)
router.use('/supplier', supplierController)
router.use('/collection', collectionController)

// Api not found handler
router.use((req, res, next) => {
  res.status(404).send('Api Resource Not Found')
})

// Api error handling
router.use(function (err, req, res, next) {
  logger.error(err.stack)
  let status = err.statusCode ? err.statusCode : 500
  res.status(status).send(err.message)
})

module.exports = router
