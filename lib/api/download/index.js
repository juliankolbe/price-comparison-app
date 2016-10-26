const priceComparisonController = require('./priceComparison/priceComparisonController')

const express = require('express')
const router = express.Router()

router.use('/priceComparison', priceComparisonController)

module.exports = router
