var passport = require('passport');
var localStrategy = require('../strategies/local.strategy');
var User = require('../models/user');

var passportConfig = function() {

  function init(app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
      done(null, user.attributes.id);
    });

    passport.deserializeUser(function(id, done){
      User.where('id', id).fetch({withRelated: 'roles'})
      .then(function(user){
        done(null, user);
      })
      .catch(function(err){
        done(err, null);
      });
    });

    localStrategy.init();
  }

  return {
    init: init
  };

}();

module.exports = passportConfig;
