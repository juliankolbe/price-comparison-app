var auth = require('./controllers/auth-controller');
var securedArea = require('./controllers/user-controller');

module.exports = function() {
  return {
    auth: auth,
    securedArea: securedArea
  };
};
