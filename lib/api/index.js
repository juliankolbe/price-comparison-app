const express = require('express')

const uploadController = require('./upload')
const supplierController = require('./supplier')
const collectionController = require('./collection')

const router = express.Router()

// API routes

// router.use('/pricelist', require pricelist router);

router.use('/upload', uploadController)
router.use('/supplier', supplierController)
router.use('/collection', collectionController)

module.exports = router
