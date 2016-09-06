'use strict';

const bookshelf = require('../../database');
const User = require('./user');

module.exports = bookshelf.Model.extend({
    tableName: 'role',
    users() {
        return this.belongsToMany(User, 'user_role');
    }
});
