'use strict'

const Bookshelf = require('_/database')

require('./user')
const Role = Bookshelf.Model.extend({
  tableName: 'role',
  users () {
    return this.belongsToMany('User', 'user_role')
  }
})

module.exports = Bookshelf.model('Role', Role)
