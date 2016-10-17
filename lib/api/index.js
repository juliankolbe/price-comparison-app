const express = require('express')
const logger = require('_/logger')

const uploadController = require('./upload')
const supplierController = require('./supplier')
const collectionController = require('./collection')

const router = express.Router()

// API routes

// router.use('/pricelist', require pricelist router);

router.use('/upload', uploadController)
router.use('/supplier', supplierController)
router.use('/collection', collectionController)

// Api error handling
router.use(function (err, req, res, next) {
  logger.error(err.stack)
  let status = err.statusCode ? err.statusCode : 500
  res.status(status).send(err.message)
})

module.exports = router
