
exports.up = function (knex, Promise) {
  return knex.schema

  // <price_list_collection>
  .createTable('price_list_collection', function (tbl) {
    // PK
    tbl.increments('id')

    // FK
    tbl.integer('user_id').references('id').inTable('user').index()

    // Fields
    tbl.integer('number_of_lists').notNullable()
    tbl.date('dated_at').notNullable()

    // Timestamps
    tbl.timestamp('created_at').defaultTo(knex.fn.now())
    tbl.timestamp('updated_at').defaultTo(knex.fn.now())
  })

  // <price_list>
  .createTable('price_list', function (tbl) {
    // PK
    tbl.increments('id')

    // FK
    tbl.integer('supplier_id').notNullable().references('id').inTable('supplier').index()
    tbl.integer('price_list_collection_id').notNullable().references('id').inTable('price_list_collection').index()

    // Fields
    tbl.date('dated_at')
    tbl.integer('number_of_products')
    tbl.string('file_name')
    tbl.boolean('has_bonus')
    tbl.boolean('has_triple_bonus')
    tbl.boolean('has_stock')
    tbl.boolean('has_retail_price')
    tbl.boolean('has_expiry_date')

    // Timestamps
    tbl.timestamp('created_at').defaultTo(knex.fn.now())
    tbl.timestamp('updated_at').defaultTo(knex.fn.now())
  })

  // <price_list_data>
  .createTable('price_list_data', function (tbl) {
    // PK
    tbl.increments('id')

    // FK
    tbl.integer('supplier_product_name_id').notNullable().references('id').inTable('supplier_product_name').index()
    tbl.integer('master_product_name_id').notNullable().references('id').inTable('master_product_name').index()
    tbl.integer('price_list_id').notNullable().references('id').inTable('price_list').index()
    tbl.integer('price_list_collection_id').notNullable().references('id').inTable('price_list_collection').index()
    tbl.integer('supplier_id').notNullable().references('id').inTable('supplier').index()

    // tbl.integer('supplier_id').notNullable().references('id').inTable('supplier');
    // tbl.integer('user_id').notNullable().references('id').inTable('user');

    // Fields
      // Not Nullable
    tbl.float('whole_sale_price').notNullable().index()

      // Nullable
    // tbl.string('item_code', 255)
    tbl.string('packing')
    tbl.integer('stock').index()
    tbl.float('retail_price')
    tbl.string('bonus')
    tbl.string('bonus_1')
    tbl.string('bonus_2')
    tbl.string('bonus_3')
    tbl.date('expiry_date').index()
    tbl.string('agency_id')
    tbl.string('serial_number')
    tbl.string('moh_percentage')

    // Redundant fields
    // tbl.string('master_product_name');
    // tbl.string('supplier_name');
    // tbl.string('user_name');

    // Timestamps TODO: use proper timezone
    tbl.timestamp('created_at').defaultTo(knex.fn.now())
    tbl.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists('price_list_data')
    .dropTableIfExists('price_list')
    .dropTableIfExists('price_list_collection')
}
