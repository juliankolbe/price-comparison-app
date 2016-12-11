const getNewToken = require('../helpers/getNewToken')

const refreshTheToken = (req, res, next) => {
  let token = getNewToken(req.user)
  // TODO: learn about CORS
  res.header('Access-Control-Expose-Headers', 'token')
  res.set('token', `JWT ${token}`)
  next()
}

module.exports = refreshTheToken
