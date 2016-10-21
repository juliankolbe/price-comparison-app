const Bookshelf = require('_/database')
const PriceListCollection = require('../models/priceListCollection')

module.exports = Bookshelf.Collection.extend({
  model: PriceListCollection
})
