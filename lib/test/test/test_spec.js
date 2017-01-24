/* eslint-env mocha */

var assert = require('assert')

const obj1 = {
  a: {
    b: 1
  }
}
const obj2 = {
  a: {
    b: 2
  }
}
const obj3 = {
  a: {
    b: 1
  }
}
const obj4 = Object.create(obj1)


describe('A feature', function () {
  describe('A function', function () {
    it('Obj1 is equal to Obj1', function () {
      return assert.deepEqual(obj1, obj1)
    })
    it('Obj1 is equal to Obj2', function () {
      return assert.deepEqual(obj2, obj1)
    })
  })
})
