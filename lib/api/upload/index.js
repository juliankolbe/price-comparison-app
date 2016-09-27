const supplierMasterController = require('./supplierMaster/supplierMasterController')

const express = require('express')
const router = express.Router()

router.use('/suppliermaster', supplierMasterController)

module.exports = router
