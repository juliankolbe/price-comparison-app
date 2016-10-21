'use strict'

const Bookshelf = require('_/database')

require('./priceList')
require('./priceListData')
var PriceListCollection = Bookshelf.Model.extend({
  tableName: 'price_list_collection',
  hasTimeStamps: true,
  priceLists () {
    return this.hasMany('PriceList')
  },
  priceListData () {
    return this.hasMany('PriceListData')
  }
})

module.exports = Bookshelf.model('PriceListCollection', PriceListCollection)
