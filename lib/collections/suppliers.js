const Bookshelf = require('_/database')
const Supplier = require('../models/supplier')

module.exports = Bookshelf.Collection.extend({
  model: Supplier,
  getNameIdPairs () {
    let supsAtts = this.models.map((model) => model.attributes)
    let nameIdPairs = {}
    supsAtts.forEach((supAtts) => {
      nameIdPairs[supAtts.name] = supAtts.id
    })
    return nameIdPairs
  }
})
