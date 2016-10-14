const express = require('express')
const router = express.Router()
const collectionController = require('./collectionController')

router.use('/', collectionController)

module.exports = router
