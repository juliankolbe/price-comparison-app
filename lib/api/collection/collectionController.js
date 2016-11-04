const express = require('express')
const router = express.Router()
const PriceListCollection = require('_/models/priceListCollection')
const Promise = require('bluebird')
const logger = require('_/logger')
const _ = require('lodash')
const moment = require('moment-timezone')
//
const collectionsMock = [
  {
    id: 1,
    userId: 3,
    createdAt: '12312542363265235',
    updatedAt: '12341241231232323',
    numberOfLists: 6,
    datedAt: '13/09/2016'
  },
  {
    id: 2,
    userId: 3,
    createdAt: '12314342363265235',
    updatedAt: '12341234331232323',
    numberOfLists: 5,
    datedAt: '14/09/2016'
  },
  {
    id: 3,
    userId: 3,
    createdAt: '12312542363265235',
    updatedAt: '12341241231223323',
    numberOfLists: 4,
    datedAt: '15/09/2016'
  }
]

router.route('/all')
  .get(
    (req, res, next) => {
      Promise.coroutine(function * () {
        let priceListCollection = yield PriceListCollection.query(qb => qb.limit(3).offset(0).orderBy('created_at', 'DESC')).fetchAll()
        // map to attributes and then convert snake_case to camelCase
        let collections = priceListCollection.getAttributes().map(row => _.transform(row, (result, val, key) => { result[_.camelCase(key)] = val }, {}))
        // convert dates with moment, so they are readable
        .map(row => _.mapValues(row, (value, key, object) => key === 'datedAt' ? moment(value).tz('Asia/Dubai').format('MM-DD-YYYY') : value))
        .map(row => _.mapValues(row, (value, key, object) => key === 'createdAt' ? moment(value).tz('Asia/Dubai').format('MM-DD-YYYY HH:mm:ss') : value))
        // logger.debug(collections)
        // let res = _.transform(priceListCollection, (result, val, key) => { result[key.toLowerCase()] = val }, {})
        return collections
      })()
      .then((collections) => {
        // res.json(collectionsMock)
        res.json(collections)
        // res.end()
      })
      .catch((err) => {
        logger.info(err)
        next(err)
      })
    })

module.exports = router
