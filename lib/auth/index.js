var authController = require('./controllers/auth.controller');

var auth = function() {
  return {
    auth: authController
  };
}();

module.exports = auth;
