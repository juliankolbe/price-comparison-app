var passport = require('passport');
var localStrategy = require('./strategies/local.strategy');

var passportConfig = function() {

  function init(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
      done(null, user);
    });

    passport.deserializeUser(function(user, done){
      done(null, user);
    });

    localStrategy.init();
  }

  return {
    init: init
  };

}();

module.exports = passportConfig;
