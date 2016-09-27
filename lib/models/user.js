'use strict'

const Bookshelf = require('_/database')
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const securityConfig = require('../config/security-config')

require('./role')
const User = Bookshelf.Model.extend({
  tableName: 'user',
  roles () {
    return this.belongsToMany('Role', 'user_role')
  },
  validPassword (password) {
    return bcrypt.compareAsync(password, this.attributes.password)
  },
  initialize () {
    this.on('saving', model => {
      if (!model.hasChanged('password')) { return }

      return Promise.coroutine(function * () {
        const salt = yield bcrypt.genSaltAsync(securityConfig.saltRounds)
        const hashedPassword = yield bcrypt.hashAsync(model.attributes.password, salt)
        model.set('password', hashedPassword)
      })()
    })
  }
})

module.exports = Bookshelf.model('User', User)
