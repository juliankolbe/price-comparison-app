const simpleParser = require('../csvHelper/csvToObject')
const logger = require('_/logger')

const csvPreParseWrapper = (parseSettings) => {
  return (req, res, next) => {
    if (req.files) {
      parseSettings.source = req.files[0].path
    } else {
      logger.info('Csv parser: No file source')
      return
      // throw error
    }
    simpleParser.simpleParse(parseSettings)
     .then((output) => {
       req.parsedCsv = output
       next()
       return null
     })
     .catch((e) => {
       next(e)
     })
  }
}

module.exports = csvPreParseWrapper

// ERRROR HANDLING
// Send back error for inconsistent columns number, for exmaple non deleted columns
