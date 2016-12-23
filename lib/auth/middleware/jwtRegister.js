const Promise = require('bluebird')
const logger = require('_/logger')
const User = require('_/models/user')

const jwtRegister = (req, res, next) => {
  const {username, password} = req.body
  logger.debug(req.body)
  Promise.coroutine(function * () {
    let user = yield User.forge({username, password}).save()
        // .then(user => res.json(user.omit('password')))
    req.userRegister = {
      success: true,
      user: user.omit('password')
    }
    next()
  })()
  .catch(err => {
    logger.info('Register failed due to Error')
    logger.info(err)
    next(err)
  })
}

module.exports = jwtRegister
