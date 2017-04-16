/* eslint-env mocha */

const assert = require('chai').assert
const Bonus = require('../models/Bonus')
const valid = [
  'B-10+2,12+5,20+10',
  'B-10+2,12+5',
  'B-10+2',
  '4+8',
  'b-12+1',
  'B=4+1',
  ['5+3', '8+6', '10+8'],
  ['5+3', '8+6'],
  ['5+3'],
  ['5+3', '+', '+'],
  ['5+3', '8+6', '+']
]
const invalid = [
  'B-61,123,257',
  '123 257',
  '',
  undefined,
  null,
  '12 2  25 5',
  '0',
  '61',
  'NON BONUS',
  'B-4+1 MULTIPLE',
  'B-12+1,25+3 ONLY MULTI',
  'B-12+1,25+3,50+6 only'
]
describe('Parse Bonus', function () {
  it('.isValid() should return true for all valid inputs', function () {
    valid.forEach(input => {
      let bonus = new Bonus(input)
      assert.isTrue(bonus.isValid(), 'should return true for ' + input)
    })
  })

  it('.isValid() should return false for all invalid inputs', function () {
    invalid.forEach(input => {
      let bonus = new Bonus(input)
      assert.isFalse(bonus.isValid(), 'should return false for ' + input)
    })
  })

  it('.getBonusStrings() should return correct values', function () {
    let bonus = new Bonus('B-10+2,12+5,20+10')
    assert.deepEqual(bonus.getBonusStrings(), ['10+2', '12+5', '20+10'])
  })

  it('.getBonusPairs() should return an array of array with correct values', function () {
    let bonus = new Bonus('B-10+2,12+5,20+10')
    assert.deepEqual(bonus.getBonusPairs(), [['10', '2'], ['12', '5'], ['20', '10']])
  })

  it('.getNormalAmounts() should return correct values', function () {
    let bonus = new Bonus('B-10+2,12+5,20+10')
    assert.deepEqual(bonus.getNormalAmounts(), ['10', '12', '20'])
  })

  it('.getBonusAmounts() should return correct values', function () {
    let bonus = new Bonus('B-10+2,12+5,20+10')
    assert.deepEqual(bonus.getBonusAmounts(), ['2', '5', '10'])
  })

  it('.getOriginalScheme() should return the scheme passed in', function () {
    valid.forEach(input => {
      let bonus = new Bonus(input)
      assert.deepEqual(bonus.getScheme(), input)
    })
  })
  //
  // it('_splitBonus should return array of length two with correct numbers', function () {
  //   assert.deepEqual(bonus._splitBonus('10+2'), ['10', '2'])
  // })
  //
  // it('_matchSingle return array has correct length', function () {
  //   assert.equal(bonus._matchSingle('B-10+2').length, 1)
  //   assert.equal(bonus._matchSingle('B-10+2,12+5').length, 2)
  //   assert.equal(bonus._matchSingle('B-10+2,12+5,20+10').length, 3)
  // })
  //
  // it('_matchSingle returns correct values in array', function () {
  //   assert.deepEqual(bonus._matchSingle('B-10+2'), ['10+2'])
  //   assert.deepEqual(bonus._matchSingle('B-10+2,12+5,20+10'), ['10+2', '12+5', '20+10'])
  // })
  //
  // it('_matchTriple return array has correct legnth', function () {
  //   assert.equal(bonus._matchTriple(['10+2']).length, 1)
  //   assert.equal(bonus._matchTriple(['10+2', '12+5']).length, 2)
  //   assert.equal(bonus._matchTriple(['10+2', '12+5', '20+10']).length, 3)
  //   assert.equal(bonus._matchTriple(['10+2', '12+5', '+']).length, 2)
  //   assert.equal(bonus._matchTriple(['10+2', '+', '+']).length, 1)
  // })
  //
  // it('_matchTriple returns correct values in array', function () {
  //   assert.deepEqual(bonus._matchTriple(['10+2']), ['10+2'])
  //   assert.deepEqual(bonus._matchTriple(['10+2', '12+5']), ['10+2', '12+5'])
  //   assert.deepEqual(bonus._matchTriple(['10+2', '12+5', '20+10']), ['10+2', '12+5', '20+10'])
  //   assert.deepEqual(bonus._matchTriple(['10+2', '12+5', '+']), ['10+2', '12+5'])
  //   assert.deepEqual(bonus._matchTriple(['10+2', '+', '+']), ['10+2'])
  // })
})
