const generateToken = require('../helpers/generateToken')

const refreshTheToken = (req, res, next) => {
  let token = generateToken(req.user)
  // TODO: learn about CORS
  res.header('Access-Control-Expose-Headers', 'token')
  res.set('token', `JWT ${token}`)
  next()
}

module.exports = refreshTheToken
