var authController = require('./controllers/auth.controller');
var rolesAuthorize = require('./middleware/roles-authorize');
var authMiddleware = require('./middleware/auth-middleware');
var passportConfig = require('./config/passport-config');
var User = require('./models/user');
var Role = require('./models/role');

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
    },
    models: {
      role: Role,
      user: User
    }
  };
}();

module.exports = auth;
