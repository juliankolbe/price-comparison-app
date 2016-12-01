const Promise = require('bluebird')
const logger = require('_/logger')
const User = require('_/models/user')
const securityConfig = require('../config/security-config.js')
const jwt = require('jsonwebtoken')

const jwtLogin = (req, res, next) => {
  const {username, password} = req.body
  req.apiAuth = {
    success: false
  }
  Promise.coroutine(function * () {
    const user = yield User.where('username', username).fetch()
    const isValidPassword = yield user.validPassword(password)
    if (isValidPassword) {
      const token = jwt.sign(user.omit('password'), securityConfig.jwtSecret, { expiresIn: securityConfig.expires })
      req.apiAuth = {
        token: token,
        success: true
      }
    }
    next()
  })()
  .catch(err => {
    logger.info('Login failed due to Error')
    logger.info(err)
    next(err)
  })
}

module.exports = jwtLogin
