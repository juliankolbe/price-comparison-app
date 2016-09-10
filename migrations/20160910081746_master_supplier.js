
exports.up = function(knex, Promise) {
  return knex.schema

  // <supplier>
  .createTable('supplier', function(tbl)
  {
    //PK
    tbl.increments('id');

    //UQ
    tbl.string('name', 255).notNullable().unique('uq_supplier');

    // Timestamps
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  // <master_product_name>
  .createTable('master_product_name', function(tbl)
  {
    //PK
    tbl.increments('id');

    //UQ
    tbl.string('master_product_name', 255).notNullable().unique('uq_master_product_name').index();

    // Timestamps
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());
  })
  // <supplier_product_name>
  .createTable('supplier_product_name', function(tbl)
  {
    //PK
    tbl.increments('id');

    //FK
    tbl.integer('master_product_name_id').notNullable().references('id').inTable('master_product_name');
    tbl.integer('supplier_id').notNullable().references('id').inTable('supplier');

    //Fields
    tbl.string('supplier_product_name', 255).notNullable().index();

    // Timestamps
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.timestamp('updated_at').defaultTo(knex.fn.now());

  });

};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('supplier_product_name')
    .dropTableIfExists('master_product_name')
    .dropTableIfExists('supplier');
};
