exports.up = function (knex, Promise) {
  return knex.schema.table('price_list_collection', function (tbl) {
    tbl.index([ 'dated_at' ])
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('products', function (tbl) {
    tbl.dropIndex([ 'dated_at' ])
  })
}
