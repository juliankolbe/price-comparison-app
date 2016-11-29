const passport = require('passport')
const configurePassport = require('./config/passport-jwt-config')

const initialize = function (router) {
  router.use(passport.initialize())
  configurePassport()
}

module.exports = initialize
