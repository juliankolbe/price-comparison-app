const supplierMasterController = require('./supplierMaster/supplierMasterController')
const collectionController = require('./collection/collectionController')

const express = require('express')
const router = express.Router()

router.use('/suppliermaster', supplierMasterController)
router.use('/collection', collectionController)

module.exports = router
