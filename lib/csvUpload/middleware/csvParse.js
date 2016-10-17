const simpleParser = require('../csvHelper/csvToObject')
const Promise = require('bluebird')

const csvParseWrapper = (parseSettings) => {
  return (req, res, next) => {
    Promise.reduce(req.files, (final, file) => {
      let fileParseSettings = Object.assign({}, parseSettings, {source: file.path, fileName: file.originalname})
      return simpleParser.simpleParse(fileParseSettings).then((outputObj) => {
        return Object.assign(final, outputObj)
      })
    }, {}).then((final) => {
      req.parsedCsv = final
      next()
      return null
    })
    .catch((e) => {
      e.statusCode = 422
      next(e)
    })
  }
}

module.exports = csvParseWrapper
