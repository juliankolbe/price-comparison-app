const express = require('express')
const logger = require('_/logger')
const jwtLogin = require('_/auth').middleware.jwtLogin
const jwtRegister = require('_/auth').middleware.jwtRegister
const jwtAuthenticate = require('_/auth').middleware.jwtAuthenticate
const refreshTheToken = require('_/auth').middleware.refreshTheToken

const router = express.Router()

router.route('/login')
  .post(
    jwtLogin,
    (req, res, next) => {
      if (req.apiAuth.success) {
        let token = req.apiAuth.token
        res.header('Access-Control-Expose-Headers', 'token')
        res.set('token', `JWT ${token}`)
        res.json({success: true, user: req.user.omit('password'), roles: req.user.related('roles').models.map(role => role.attributes.authority)})
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

router.route('/check')
  .get(
    jwtAuthenticate,
    refreshTheToken,
    (req, res, next) => {
      logger.info('Check Request Passed, new token issued')
      // res.json({success: true, token: `JWT ${getNewToken(req.user)}`})
      res.json({message: 'Authenticated', user: req.user.omit('password'), roles: req.user.related('roles').models.map(role => role.attributes.authority)})
    })

module.exports = router
