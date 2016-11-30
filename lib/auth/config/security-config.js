const moment = require('moment')

module.exports = {
  jwtSecret: 'insanely secure secret',
  saltRounds: 10,
  expires: moment().add(1, 'minute').valueOf()
}
