const bookshelf = require('_/database')

// Fetch Price List Data from DB
module.exports = (collectionId) => {
  return bookshelf.knex.select().from('price_list_data').where({price_list_collection_id: collectionId})
  .then(priceListData => {
    if (priceListData.length < 1) throw new Error(`Collection with id = ${collectionId} not found`)
    else return priceListData
  })
}
