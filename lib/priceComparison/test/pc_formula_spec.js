/* eslint-env mocha */

let assert = require('assert')
let pcFormula = require('../helpers/pcFormula')

describe('Price Comparison Formula:', function () {
  describe('Using correct inputs:', function () {
    it('Should calculate new price correctly', function () {
      assert.equal(pcFormula(30, 10, 5), '20.00')
      assert.equal(pcFormula(20.5, 8, 3), '14.91')
      assert.equal(pcFormula(20.5, 8, 4), '13.67')
      assert.equal(pcFormula(20, 8, 4), '13.33')
      assert.equal(pcFormula(22.68, 30, 4), '20.01')
      assert.equal(pcFormula(22.66, 30, 4), '19.99')
      assert.equal(pcFormula(20.15, 40, 12), '15.50')
      assert.equal(pcFormula(25.75, 80, 23), '20.00')
      assert.equal(pcFormula(25.75, 80, 0), '25.75')
      assert.equal(pcFormula('30', '10', '5'), '20.00')
      assert.equal(pcFormula('20.5', '8', '3'), '14.91')
      assert.equal(pcFormula('20.5', '8', '4'), '13.67')
      assert.equal(pcFormula('20.00', '8', '4'), '13.33')
      assert.equal(pcFormula('22.68', '30', '4'), '20.01')
      assert.equal(pcFormula('22.66', '30', '4'), '19.99')
      assert.equal(pcFormula('20.15', '40', '12'), '15.50')
      assert.equal(pcFormula('25.75', '80', '23'), '20.00')
      assert.equal(pcFormula('25.75', '80', '0'), '25.75')
    })
  })
  describe('Using invalid inputs should Error on:', function () {
    it('normalAmount or bonusAmount not being Integers', function () {
      assert.throws(() => pcFormula(20.55, 2.5, 3), Error, 'normal amount is float')
      assert.throws(() => pcFormula(20.55, 2, 3.5), Error, 'bonus amount is float')
      assert.throws(() => pcFormula(20.55, 2.5, 3.5), Error, 'normal and bonus amount is float')
      // assert.throws(() => pcFormula(20.55, '2', 3), Error, 'normal amount is string')
      // assert.throws(() => pcFormula(20.55, 2, '3'), Error, 'bonus amount is string')
      assert.throws(() => pcFormula(20.55, undefined, 3), Error, 'normal amount is undefined')
      assert.throws(() => pcFormula(20.55, 2, undefined), Error, 'bonus amount is undefined')
      assert.throws(() => pcFormula(20.55, null, 3), Error, 'normal amount is null')
      assert.throws(() => pcFormula(20.55, 2, null), Error, 'bonus amount is null')
    })

    it('basePrice not being a number with max 2 decimal places', function () {
      assert.throws(() => pcFormula(2.677, 2.5, 3), TypeError)
      assert.throws(() => pcFormula('2.677', 2.5, 3), TypeError)
      assert.throws(() => pcFormula('2,677', 2.5, 3), TypeError)
      assert.throws(() => pcFormula('', 2.5, 3), TypeError)
      assert.throws(() => pcFormula(undefined, 2.5, 3), TypeError)
      assert.throws(() => pcFormula(null, 2.5, 3), TypeError)
      assert.throws(() => pcFormula('string', 2.5, 3), TypeError)
      assert.throws(() => pcFormula(true, 2.5, 3), TypeError)
      assert.throws(() => pcFormula({}, 2.5, 3), TypeError)
      assert.throws(() => pcFormula({ a: 2.5 }, 2.5, 3), TypeError)
    })
  })
})