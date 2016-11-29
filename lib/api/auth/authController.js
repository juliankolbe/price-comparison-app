const express = require('express')
const logger = require('_/logger')
const jwtLogin = require('_/auth').middleware.jwtLogin
const jwtRegister = require('_/auth').middleware.jwtRegister

const router = express.Router()

router.route('/login')
  .post(
    jwtLogin,
    (req, res, next) => {
      if (req.apiAuth.success) {
        let token = req.apiAuth.token
        res.json({success: true, token: `JWT ${token}`})
      } else {
        res.json({success: false, msg: 'Authentication failed'})
      }
    })

router.route('/register')
  .post(
    jwtRegister,
    (req, res, next) => {
      if (req.userRegister.success) {
        res.json(req.userRegister.user)
      }
    })

module.exports = router
