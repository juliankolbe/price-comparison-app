/* eslint-env mocha */
process.env.NODE_ENV = 'testing'

let assert = require('assert')
let fetchIdNamePairs = require('../helpers/fetchIdNamePairs')

describe('Fetch Id Name pairs', function () {
  it('should return id name pairs for all three', function () {
    return fetchIdNamePairs()
      .then(nameIdPairs => {
        assert(Object.keys(nameIdPairs.supplierNameIds).length > 0)
        assert(Object.keys(nameIdPairs.supplierProductNameIds).length > 0)
        assert(nameIdPairs.masterProductNamesKnex.length > 0)
      }, error => {
        throw error
      })
  })
  it.skip('should error on not finding records', function () {
  })
})
