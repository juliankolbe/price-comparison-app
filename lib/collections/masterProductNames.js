const Bookshelf = require('_/database')
const MasterProductName = require('../models/masterProductName')

module.exports = Bookshelf.Collection.extend({
  model: MasterProductName
})
