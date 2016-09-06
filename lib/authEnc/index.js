var authController = require('./controllers/auth.controller');
var rolesAuthorize = require('./middleware/roles-authorize');
var authMiddleware = require('./middleware/auth-middleware');
var passportConfig = require('./config/passport-config');

var auth = function() {
  return {
    controllers: {
      authController: authController
    },
    middleware: {
      rolesAuthorize: rolesAuthorize,
      authMiddleware: authMiddleware
    },
    config: {
      passportConfig: passportConfig
    }
  };
}();

module.exports = auth;
