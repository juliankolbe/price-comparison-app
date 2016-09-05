
exports.seed = function(knex, Promise) {

  var tblName = 'user_role';

  var rows =
  [
    {role_id: 1, user_id: 1},                   // 1
    {role_id: 2, user_id: 2}                  // 2
  ];

  return knex(tblName)
    .del()                                        // Deletes ALL existing entries
    .then(function () {
      return knex.insert(rows).into(tblName);     // Insert new rows
    });
};
