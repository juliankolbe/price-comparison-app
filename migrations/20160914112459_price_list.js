
exports.up = function(knex, Promise) {
  return knex.schema

  // <price_list_collection>
  .createTable('price_list_collection', function(tbl)
  {
    //PK
    tbl.increments('id');

    //FK
    tbl.integer('user_id').notNullable().references('id').inTable('user');

    //Fields
    tbl.integer('number_of_lists').notNullable();
    tbl.date('dated_at').notNullable();

    // Timestamps
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  })

  // <price_list>
  .createTable('price_list', function(tbl)
  {
    //PK
    tbl.increments('id');

    //FK
    tbl.integer('supplier_id').notNullable().references('id').inTable('supplier');
    tbl.integer('price_list_collection_id').notNullable().references('id').inTable('price_list_collection');

    //Fields
    tbl.integer('number_of_products').notNullable();
    tbl.boolean('bonus');
    tbl.boolean('stock');
    tbl.boolean('retail_price');

    // Timestamps
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  })

  // <supplier_product_name>
  .createTable('price_list_data', function(tbl)
  {
    //PK
    tbl.increments('id');

    //FK
    tbl.integer('supplier_product_name_id').notNullable().references('id').inTable('supplier_product_name');
    tbl.integer('price_list_id').notNullable().references('id').inTable('price_list');
    tbl.integer('price_list_collection_id').notNullable().references('id').inTable('price_list_collection');
    //tbl.integer('supplier_id').notNullable().references('id').inTable('supplier');
    //tbl.integer('user_id').notNullable().references('id').inTable('user');

    //Fields
      // Not Nullable
    tbl.float('whole_sale_price').notNullable();
    tbl.float('retail_price').notNullable();
    tbl.string('bonus_scheme').notNullable();
    tbl.date('expiry_date').notNullable();

      // Nullable
    tbl.string('item_code', 255);
    tbl.string('packing');
    tbl.integer('stock');

    //Redundant fields
    // tbl.string('master_product_name');
    // tbl.string('supplier_name');
    // tbl.string('user_name');

    // Timestamps
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());

  });

};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('price_list_data')
    .dropTableIfExists('price_list')
    .dropTableIfExists('price_list_collection');
};
