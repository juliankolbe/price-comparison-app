const express = require('express')
const router = express.Router()
const authController = require('./authController')

router.use('/', authController)

module.exports = router
