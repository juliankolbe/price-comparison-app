/* eslint-env mocha */

let assert = require('assert')
let currencyDotToComma = require('../helpers/currencyDotToComma')

describe('Currency Dot to Comma', function () {
  it('should convert string correctly', function () {
    assert.equal(currencyDotToComma('1.23'), '1,23')
  })
  it('should convert float correctly', function () {
    assert.equal(currencyDotToComma(1.23), '1,23')
  })
  it.skip('should return to two decimal places', function () {
    assert.equal(currencyDotToComma('1.2'), '1,20')
  })
  it.skip('should reject numbers with more than one dot', function () {

  })
})
