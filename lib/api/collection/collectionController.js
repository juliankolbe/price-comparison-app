const express = require('express')
const router = express.Router()
// const Promise = require('bluebird')
// const logger = require('_/logger')

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
    (req, res) => {
      // res.header('Access-Control-Allow-Origin', '*')
      // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.json(collectionsMock)
    })

module.exports = router
