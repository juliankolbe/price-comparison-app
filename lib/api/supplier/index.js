const express = require('express')
const router = express.Router()
const supplierController = require('./supplierController')

router.use('/', supplierController)

module.exports = router
