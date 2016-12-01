const moment = require('moment')
const logger = require('_/logger')

let timestamp = moment().add(1, 'minute').unix()

logger.info(timestamp)
