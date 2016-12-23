/*
  Ideally, the JWT access token should include the roles, therefore a database check would be irrelevant, => peformance gain
*/
const _ = require('lodash')

module.exports = function (...authorizedRoles) {
  return function (req, res, next) {
    const currentUserRoles = req.user.related('roles').models.map(role => role.attributes.authority)
    if (!_.intersection(currentUserRoles, authorizedRoles).length) {
      res.status(403)
      res.send('Not permitted')
      return
    }
    next()
  }
}
