const simpleParser = require('../csvHelper/csvToObject')
const Promise = require('bluebird')
const logger = require('_/logger')

const csvParseWrapper = (parseSettings) => {
  return (req, res, next) => {
    Promise.reduce(req.files, (final, file) => {
      let fileParseSettings = Object.assign({}, parseSettings, {source: file.path, fileName: file.originalname})
      return simpleParser.simpleParse(fileParseSettings).then((outputObj) => {
        // return Object.assign(final, outputObj)
        return final.concat([outputObj])
      })
    }, []).then((final) => {
      req.parsedCsv = final
      logger.info('CSV Parse: succeeded')
      next()
      return null
    })
    .catch((e) => {
      e.statusCode = 422
      logger.info('CSV Parse: failed')
      next(e)
    })
  }
}

module.exports = csvParseWrapper
