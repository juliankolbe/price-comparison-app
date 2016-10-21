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
  getNameIdPairs (nameColumn, idColumn) {
    const makeNameIdPairObject = (name, id) => {
      let attsArrayOfObjects = this.models.map((model) => model.attributes)
      let nameIdPairs = {}
      attsArrayOfObjects.forEach((attObj) => {
        nameIdPairs[attObj[name]] = attObj[id]
      })
      return nameIdPairs
    }
    // switch (this.tableName()) {
    //   case 'supplier':
    //     return makeNameIdPairObject('name', 'id')
    //   case 'master_product_name':
    //     return makeNameIdPairObject('master_product_name', 'id')
    //   case 'price_list':
    //     return makeNameIdPairObject('file_name', 'id')
    //   default:
    //     return null
    // }
    return makeNameIdPairObject(nameColumn, idColumn)
  },
  getArrayofColumn (columnName) {
    if (this.models.length > 0 && this.models[0].attributes[columnName]) {
      return this.models.map((model) => model.attributes[columnName])
    } else {
      return null
    }
  },
  // Returns array of Promises
  batchInsert (batchSize, options = {}) {
    let rows = this.models.map((model) => model.attributes)
    let tblName = this.tableName()
    let batches = _.chunk(rows, batchSize)
    let promises
    if (options.transacting) {
      promises = batches.map((batch) => knex.insert(batch).into(tblName).transacting(options.transacting))
    } else {
      promises = batches.map((batch) => knex.insert(batch).into(tblName))
    }
    if (promises) {
      return Promise.all(promises)
    } else {
      return null
    }
  },
  nativeBatchInsert (batchSize, options = {}) {
    let rows = this.models.map((model) => model.attributes)
    let tblName = this.tableName()
    let promise
    if (options.transacting) {
      promise = knex.batchInsert(tblName, rows, batchSize).transacting(options.transacting)
    } else {
      promise = knex.batchInsert(tblName, rows, batchSize)
    }
    return promise
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
