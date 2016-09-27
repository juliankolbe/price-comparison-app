'use strict' // why?

const config = require('./../knexfile')
const knex = require('knex')(config.development)
const logger = require('_/logger')
const bookshelf = require('bookshelf')(knex)
const Promise = require('bluebird')
const _ = require('lodash')

knex.raw('select 1+1 as result')
.then(function (result) {
  logger.info('Connected to Database')
})
.catch(function (err) {
  logger.error(err)
})

bookshelf.Model = bookshelf.Model.extend({
  fastSelect () {
    knex.select('master_product_name')
  }
})

bookshelf.Collection = bookshelf.Collection.extend({
  getNameIdPairs () {
    const makeNameIdPairObject = (name, id) => {
      let attsArrayOfObjects = this.models.map((model) => model.attributes)
      let nameIdPairs = {}
      attsArrayOfObjects.forEach((attObj) => {
        nameIdPairs[attObj[name]] = attObj[id]
      })
      return nameIdPairs
    }
    switch (this.tableName()) {
      case 'supplier':
        return makeNameIdPairObject('name', 'id')
      case 'master_product_name':
        return makeNameIdPairObject('master_product_name', 'id')
      default:
        return null
    }
  },
  getArrayofColumn (columnName) {
    if (this.models.length > 0 && this.models[0].attributes[columnName]) {
      return this.models.map((model) => model.attributes[columnName])
    } else {
      return null
    }
  },
  // Returns array of Promises
  batchInsert (batchSize) {
    let rows = this.models.map((model) => model.attributes)
    let tblName = this.tableName()
    let batches = _.chunk(rows, batchSize)
    let promises = batches.map((batch) => knex.insert(batch).into(tblName))
    return Promise.all(promises)
  },
  getAttributes () {
    return this.models.map((model) => model.attributes)
  }
  // getRelationAttributes (relation) {
  //   if (this.models && this.models[0].relations && this.models.relations[relation]) {
  //     return this.models.map((model) => model.relations[relation].attributes)
  //   } else {
  //     return null
  //   }
  // }
})

bookshelf.plugin('registry')
module.exports = bookshelf

// Perform latest database migrations
// knex.migrate.latest([config]);
