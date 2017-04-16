/* eslint-env mocha */

require('./_util').mochaGen()
const DB = require('../db')
const assert = require('chai').assert

describe('PC - DB', function () {
  let db
  before(function () {
    db = new DB({debug: true})
  })

  // it('Price List data', function * () {
  //
  //   let start = new Date()
  //   let res = yield db.fetchPLDbyCollectionId(19)
  //   // let mns = yield db.fetchMasterPNs()
  //   let hash = res.reduce((masterHash, product) => {
  //     if (!masterHash[product.master_product_name]) {
  //       masterHash[product.master_product_name] = product.master_product_name
  //     }
  //     return masterHash
  //   }, {})
  //   console.log(Object.keys(hash).length)
  //   console.log(res[0])
  //   // console.log(mns[0])
  //   console.log(new Date() - start + ' ms')
  // })

  describe('Price List data by collectionId', function () {
    let record, allRecords
    before(function * () {
      allRecords = yield db.fetchPLDbyCollectionId(19)
      record = allRecords[0]
    })
    it('should have all desired properties', function () {
      assert.property(record, 'id')
      assert.property(record, 'whole_sale_price')
      assert.property(record, 'packing')
      assert.property(record, 'retail_price')
      assert.property(record, 'bonus')
      assert.property(record, 'bonus_1')
      assert.property(record, 'bonus_2')
      assert.property(record, 'bonus_3')
      assert.property(record, 'stock')
      assert.property(record, 'expiry_date')
      assert.property(record, 'agency_id')
      assert.property(record, 'serial_number')
      assert.property(record, 'moh_percentage')
      assert.property(record, 'created_at')
      assert.property(record, 'updated_at')
      assert.property(record, 'supplier_name')
      assert.property(record, 'supplier_product_name')
      assert.property(record, 'master_product_name')
      assert.property(record, 'master_product_name_id')
    })

    it('should have valid supplier name for each record', function () {
      allRecords.map((record) => assert.isString(record.supplier_name, 'supplier name is not a string'))
    })
    it('should have valid supplier product name for each record', function () {
      allRecords.map((record) => assert.isString(record.supplier_product_name, 'supplier product name is not a string'))
    })
    it('should have valid master product name for each record', function () {
      allRecords.map((record) => assert.isString(record.master_product_name, 'master product name is not a string'))
    })
    it('should have valid whole sale price for each record', function () {
      allRecords.map((record) => assert.isNumber(record.whole_sale_price, 'whole sale price is not a number'))
    })

    after(function () {
      record = undefined
    })
  })

  after(function () {
    db = undefined
  })
})
