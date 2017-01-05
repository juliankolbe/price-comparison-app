const express = require('express')
const logger = require('_/logger')
const auth = require('_/auth')
// const passport = require('passport')

const uploadController = require('./upload')
const downloadController = require('./download')
const supplierController = require('./supplier')
const collectionController = require('./collection')
const authController = require('./auth')

const router = express.Router()

// API Authentication
  // Initialize passport
auth.initialize(router)
  // Login & Register
router.use('/auth', authController)
  // Authenticate every api route below this line
router.use(auth.middleware.jwtAuthenticate)
  // Refresh the access token if authticated
router.use(auth.middleware.refreshTheToken)
// API routes

// router.use('/pricelist', require pricelist router);

  // User Api Routes
router.use(auth.middleware.rolesAuthorize('ADMIN', 'USER'))

router.use('/upload', uploadController)
router.use('/download', downloadController)
router.use('/supplier', supplierController)
router.use('/collection', collectionController)

  // Admin Api routes
router.use(auth.middleware.rolesAuthorize('ADMIN'))

// Api not found handler
router.use((req, res, next) => {
  res.status(404).send('Api Resource Not Found')
})

// Api error handling
router.use(function (err, req, res, next) {
  logger.error(err.stack)
  let status = err.statusCode ? err.statusCode : 500
  let resBody = err.resBody ? err.resBody : {}
  let body = Object.assign(resBody, { message: err.message })
  res.status(status).json(body)
})

module.exports = router
