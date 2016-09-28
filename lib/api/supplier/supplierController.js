const express = require('express')
const router = express.Router()
const Promise = require('bluebird')
const Supplier = require('_/models/supplier')
// const Suppliers = require('_/collections/suppliers')
const logger = require('_/logger')

router.route('/all')
  .get(
    (req, res) => {
      Promise.coroutine(function * () {
        let suppliers = yield Supplier.fetchAll()
        let supAtts = suppliers.getAttributes()
        res.json(supAtts)
      })()
      .catch(err => {
        logger.info(err)
        res.send('Request failed')
      })
    })

router.route('/')
  .post(
    (req, res) => {
      let supplierObj = {
        name: req.body.supplierName
      }
      Promise.coroutine(function * () {
        yield Supplier.forge(supplierObj).save()
        res.json('Supplier Saved')
      })()
      .catch(err => {
        logger.info(err)
        res.send('Saving Failed')
      })
      // req.body has supplier names
      // forge a collections
      // save
    })

module.exports = router
