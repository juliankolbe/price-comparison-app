'use strict'; //why?

var config = require('./../knexfile');
var knex = require('knex')(config.development);

knex.raw('select 1+1 as result')
.then(function(result) {
  console.log('Connected to Database');
})
.catch(function(err){
  console.error(err);
});

module.exports = require('bookshelf')(knex);


// Perform latest database migrations
// knex.migrate.latest([config]);
