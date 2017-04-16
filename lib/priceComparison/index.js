const pcMiddleware = require('./middleware/priceComparison')
const ArrangeProcess = require('./processes/arrange')
const basePC = require('./arrangers/basePC')
const DB = require('./db')

const priceComparison = (options) => {
  const arrangeProcess = new ArrangeProcess({ db: new DB(), baseArranger: basePC })
  return pcMiddleware(arrangeProcess)
}

module.exports = priceComparison
