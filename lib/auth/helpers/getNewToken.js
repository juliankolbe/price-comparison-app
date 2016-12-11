const jwt = require('jsonwebtoken')
const securityConfig = require('../config/security-config.js')

function getNewToken (user) {
  return jwt.sign(user.omit('password'), securityConfig.jwtSecret, { expiresIn: securityConfig.expiresIn })
}

module.exports = getNewToken
