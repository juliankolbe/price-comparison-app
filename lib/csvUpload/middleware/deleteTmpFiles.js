const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const logger = require('_/logger')

const deleteTmpFiles = (req, res, next) => {
  let fileDestinations
  if (req.files) {
    fileDestinations = req.files.map((file) => file.path)
  } else {
    logger.info('Delete Tmp Files: Request Object has no files property')
    return
  }
  let unlinkPromises = fileDestinations.map((fileDest) => fs.unlinkAsync(fileDest))
  Promise.all(unlinkPromises)
    .then(() => {
      logger.info('Delete Tmp Files: ' + fileDestinations)
      next()
      return null
    })
    .catch((e) => {
      logger.info('Delete Tmp Files: Error Deleting Files')
      next(e)
    })
}

module.exports = deleteTmpFiles
