'use strict'; //why?

var config = require('./../knexfile');
var knex = require('knex')(config.development);
var logger = require('_/logger');

knex.raw('select 1+1 as result')
.then(function(result) {
  logger.info('Connected to Database');
})
.catch(function(err){
  logger.error(err);
});

module.exports = require('bookshelf')(knex);


// Perform latest database migrations
// knex.migrate.latest([config]);
