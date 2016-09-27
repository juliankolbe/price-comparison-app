const simpleParser = require('../csvHelper/csvToObject')
const logger = require('_/logger')

const csvParseWrapper = (parseSettings) => {
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
       logger.debug(output.length)
       next()
       return null
     })
     .catch((e) => {
       next(e)
     })
  }
}

module.exports = csvParseWrapper
