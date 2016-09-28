const express = require('express')
const router = express.Router()
// const Promise = require('bluebird')
// const logger = require('_/logger')

router.route('/all')
  .get(
    (req, res) => {

    })

router.route('/')
  .post(
    (req, res) => {

    })

router.route('/nomatches')
  .post(
    (req, res) => {
      // Return all mater names that have no supplierProductsNames referencing them
    })

module.exports = router
