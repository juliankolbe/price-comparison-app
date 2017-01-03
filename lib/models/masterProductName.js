'use strict'

const Bookshelf = require('_/database')
const logger = require('_/logger')

require('./supplierProductName')
var MasterProductName = Bookshelf.Model.extend({
  tableName: 'master_product_name',
  hasTimeStamps: true,
  supplierProductNames () {
    return this.hasMany('SupplierProductName')
  },
  initialize () {
    // this.on('fetched', model => {
    //   logger.debug('MasterProductNames fetched')
    // })
  }
})

module.exports = Bookshelf.model('MasterProductName', MasterProductName)
