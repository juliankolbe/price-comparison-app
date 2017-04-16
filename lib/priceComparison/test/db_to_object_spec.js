/* eslint-env mocha */

// const assert = require('assert')
const http = require('http')
// const methods = require('methods')
const request = require('supertest')
const dbToObject = require('../middleware/dbToObject')
const ArrangeProcess = require('../processes/arrange')
const arrangeForFile = require('../helpers/arrangeForFile')
const DB = require('../db')
const sinon = require('sinon')
const assert = require('assert')
const priceListData = require('./test_data/price_list_data')
const toCsvOutput = require('./test_data/to_csv_output')
const Promise = require('bluebird')

describe('Price Comparison Middleware', function () {
  let server
  let _priceListData
  let arrangeProcess
  let _output

  describe('should error on', function () {
    before(function () {
      _priceListData = []
      arrangeProcess = new ArrangeProcess({ db: new DB(), arranger: arrangeForFile })
      server = createServer({ arrangeProcess })
    })

    it('no priceListData or collectionId in request object', function (done) {
      request(server)
      .post('/')
      .expect(500, done)
    })
    it('no arrange proccess being passed in', function () {
      let _priceListData = []
      let arrangeProcess = {}
      assert.throws(() => createServer({ arrangeProcess, _priceListData }), 'should throw on no instance of ArrangeProcess being passed to middleware')
    })
  })

  describe('with valid inputs', function () {
    before(function () {
      _priceListData = priceListData[0]
      _output = toCsvOutput[0]
      arrangeProcess = new ArrangeProcess({ db: {}, arranger: {} })
      sinon.stub(arrangeProcess, 'getPriceListData').returns(new Promise(resolve => resolve(_priceListData)))
      sinon.stub(arrangeProcess, 'arrangeForFile').returns(new Promise(resolve => resolve(_output)))
    })
    it('should work with valid collection id', function (done) {
      server = createServer({ arrangeProcess, collectionId: 2 })
      request(server)
      .post('/')
      .expect(200, done)
    })
    it('should work with valid price list data', function (done) {
      server = createServer({ arrangeProcess, _priceListData })
      request(server)
      .post('/')
      .expect(200, done)
    })
  })
})

function createServer (settings) {
  let arrangeProcess = settings && settings.arrangeProcess
  let _dbToObject = dbToObject(arrangeProcess)

  return http.createServer(function (req, res) {
    req.priceListData = settings && settings.priceListData
    req.collectionId = settings && settings.collectionId
    _dbToObject(req, res, function (err) {
      res.statusCode = err ? (err.status || 500) : 200
      res.end(err ? err.message : JSON.stringify(req.body))
    })
  })
}
