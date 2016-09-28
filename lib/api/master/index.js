const express = require('express')
const router = express.Router()
const masterController = require('./masterController')

router.use('/', masterController)

module.exports = router
