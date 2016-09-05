
exports.up = function(knex, Promise) {
  return knex.schema

  // <role>
  .createTable('role', function(tbl)
  {
    //PK
    tbl.increments('id');

    //UQ
    tbl.string('authority', 255).notNullable().unique('uq_authority');
  })
  // <user>
  .createTable('user', function(tbl)
  {
    //PK
    tbl.increments('id');

    //UQ
    tbl.string('username', 255).notNullable().unique('uq_username');

    //Fields
    tbl.string('password', 255).notNullable();
  })
  // <user_role>
  .createTable('user_role', function(tbl)
  {
    //FK
    tbl.integer('role_id').notNullable().references('id').inTable('role');
    tbl.integer('user_id').notNullable().references('id').inTable('user');

    tbl.primary(['user_id', 'role_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('role')
    .dropTableIfExists('user')
    .dropTableIfExists('user_role');
};
