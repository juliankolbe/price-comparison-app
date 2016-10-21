const Bookshelf = require('_/database')
const PriceList = require('../models/priceList')

module.exports = Bookshelf.Collection.extend({
  model: PriceList
})
