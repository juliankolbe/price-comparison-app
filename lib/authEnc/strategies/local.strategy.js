var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Promise = require('bluebird'),
    User = require('../models/user'),
    logger = require('_/logger');

var strat = function() {
  function init() {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
      },
      function(username, password, done){
        Promise.coroutine(function* () {
          const user = yield User.where('username', username).fetch({withRelated: 'roles'});
          // const roles = user.related('roles').models.map(role => role.attributes.authority);
          // const roles = yield user.roles().query({where: {user_id: user.attributes.id}}).fetch();
          var isValidPassword = false;
          if(user) {
            isValidPassword = yield user.validPassword(password);
            if(isValidPassword) {
              var userData = user.attributes;
              // dont send password along later
              logger.info(`User: ${user.attributes.username} logged in with Roles: ${user.related('roles').models.map(role => role.attributes.authority)}`);
              done(null, user);
            }
            else {
              logger.info(`Failed Login: user:"${username}" passwords do not match. Password attempted:"${password}"`);
              done(null, false);
            }
          }
          else {
            logger.info(`Failed Login: user:"${username}" does not exist`);
            done(null, false);
          }
        })().catch(err => console.log(err));
      })
    );
  }

  return {
    init: init
  };
}();

module.exports = strat;
