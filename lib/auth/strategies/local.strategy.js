var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Promise = require('bluebird'),
    User = require('../models/user');

var strat = function() {
  function init() {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
      },
      function(username, password, done){
        Promise.coroutine(function* () {
          const user = yield User.where('username', username).fetch();
          var isValidPassword = false;
          if(user) {
            isValidPassword = yield user.validPassword(password);
            if(isValidPassword) {
              var userData = user.attributes;
              done(null, userData);
            }
            else {
              done(null, false);
            }
          }
          else {
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
