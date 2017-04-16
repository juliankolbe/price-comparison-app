/* eslint-env mocha */

let assert = require('assert')
let fetchWithCollectionId = require('../helpers/fetchWithCollectionId')

describe('Fetch with Collection', function () {
  it('should return records using correct id', function () {
    return fetchWithCollectionId(19)
      .then(priceListDataArray => {
        assert(priceListDataArray.length > 0, 'price list data array length is not > 0')
      })
  })
  it('should error on incorrect collection id', function () {
    return fetchWithCollectionId(-1)
      .then(priceListDataArray => {
        throw new Error('Promise was unexpectedly fullfilled')
      }, error => {
        assert(error, 'with id = -1')
      })
  })
})
