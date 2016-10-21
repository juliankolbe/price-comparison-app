const Bookshelf = require('_/database')
const PriceListData = require('../models/priceListData')

module.exports = Bookshelf.Collection.extend({
  model: PriceListData
})
