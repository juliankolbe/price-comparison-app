
exports.seed = function(knex, Promise) {

  var tblName = 'role';

  var rows =
  [
    {authority: 'ROLE_ADMIN'},                   // 1
    {authority: 'ROLE_USER'}                    // 2
  ];

  return knex(tblName)
    .del()                                        // Deletes ALL existing entries
    .then(function () {
      return knex.insert(rows).into(tblName);     // Insert new rows
    });
};
