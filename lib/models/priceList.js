'use strict'

const Bookshelf = require('_/database')

require('./supplier')
require('./priceListData')
require('./priceListCollection')
var PriceList = Bookshelf.Model.extend({
  tableName: 'price_list',
  hasTimeStamps: true,
  priceListData () {
    return this.hasMany('PriceListData')
  },
  supplier () {
    return this.belongsTo('Supplier')
  },
  priceListCollection () {
    return this.belongsTo('PriceListCollection')
  }
})

module.exports = Bookshelf.model('PriceList', PriceList)
