const logger = require('_/logger')
const objectsToCsvFile = require('../csvHelper/objectsToCsvFile')

const createCsvFileWrapper = (path) => {
  return (req, res, next) => {
    let settings = req.createCsvFileSettings || {}
    let columns = settings.columns
    let rows = settings.rows
    objectsToCsvFile(columns, rows, path)
    .then(() => {
      logger.info('Creating Csv File: success')
      next()
      return null
    })
    .catch(err => {
      logger.info('Creating Csv File: failed')
      logger.error(err)
      next(err)
    })
  }
}

module.exports = createCsvFileWrapper
