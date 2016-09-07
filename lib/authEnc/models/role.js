'use strict';

const bookshelf = require('_/database');
const User = require('./user');

module.exports = bookshelf.Model.extend({
    tableName: 'role',
    users() {
        return this.belongsToMany(User, 'user_role');
    }
});
