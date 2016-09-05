
exports.seed = function(knex, Promise) {

  var tblName = 'user';

  var rows =
  [
    {password: '$2a$10$BCYu4wAXWMDXpjnqb9PdSeNi2lUtqRCHvUYv6oWxaOKjEgiJN4Sz2', username: 'Admin'},                   // 1
    {password: '$2a$10$Pv8Y8BDxeiSbg6yb/CMdrOD0z2Z3FZb3R/DfwW2zGXIEFvAbyQp7y', username: 'Rob7'},
  ];

  return knex(tblName)
    .del()                                        // Deletes ALL existing entries
    .then(function () {
      return knex.insert(rows).into(tblName);     // Insert new rows
    });
};
