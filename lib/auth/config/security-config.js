module.exports = {
  jwtSecret: 'insanely secure secret',
  saltRounds: 10,
  // Expiry date in seconds, as per this api: https://www.npmjs.com/package/jsonwebtoken
  expiresIn: 3600
}
