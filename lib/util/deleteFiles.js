const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const logger = require('_/logger')

const deleteFiles = (filePaths) => {
  let unlinkPromises = filePaths.map((fileDest) => fs.unlinkAsync(fileDest))
  Promise.all(unlinkPromises)
    .then(() => {
      logger.info(`Deleted ${Object.keys(filePaths).length} Tmp Files`)
      return null
    })
    .catch((e) => {
      logger.info('Delete Tmp Files: Error Deleting Files')
    })
}

module.exports = deleteFiles
