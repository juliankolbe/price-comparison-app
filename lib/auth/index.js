const jwtAuthenticate = require('./middleware/jwt-authenticate')
const rolesAuthorize = require('./middleware/roles-authorize')
const jwtLogin = require('./middleware/jwtLogin')
const jwtRegister = require('./middleware/jwtRegister')
const passportJwtConfig = require('./config/passport-jwt-config')
const securityConfig = require('./config/security-config')
const initialize = require('./initialize')
const generateToken = require('./helpers/generateToken')
const refreshTheToken = require('./middleware/refreshTheToken')

module.exports = {
  middleware: {
    jwtAuthenticate: jwtAuthenticate,
    rolesAuthorize: rolesAuthorize,
    jwtLogin: jwtLogin,
    jwtRegister: jwtRegister,
    refreshTheToken: refreshTheToken
  },
  config: {
    passportJwtConfig: passportJwtConfig,
    securityConfig: securityConfig
  },
  helpers: {
    generateToken: generateToken
  },
  initialize: initialize
}

// const auth = (function () {
//   return {
//     middleware: {
//       jwtAuthenticate: jwtAuthenticate,
//       rolesAuthorize: rolesAuthorize,
//       jwtLogin: jwtLogin,
//       jwtRegister: jwtRegister
//     },
//     config: {
//       passportJwtConfig: passportJwtConfig,
//       securityConfig: securityConfig
//     },
//     initialize: initialize
//   }
// })()
//
// module.exports = auth
