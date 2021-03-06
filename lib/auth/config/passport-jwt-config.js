'use strict'

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const securityConfig = require('./security-config')
const User = require('_/models/user')

module.exports = function () {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
  opts.secretOrKey = securityConfig.jwtSecret
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload)
    User.where('id', jwt_payload.id).fetch({withRelated: 'roles'})
        .then(user => {
          if (user) {
            done(null, user)
          } else {
            done(null, false)
          }
          return null
        })
        .catch(err => done(err, false))
  }))
}
