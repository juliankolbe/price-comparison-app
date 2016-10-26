const moment = require('moment-timezone')

const converter = (() => {
  const parseDate = (dateString) => {
    // #1: Sultan and Tamimi Date format
    // #2: Medseven
    // TODO: Use proper fucking regex, not this crap
    let momentDate
    if (/^\w{3}(?:\.|\s)\d{1,2}$/.test(dateString)) {
      momentDate = moment(dateString.replace(/[.]/g, ' '), 'MMM DD')
    } else if (/^\d{1,2}\/\d{1,2}$/.test(dateString)) {
      momentDate = moment(dateString, 'MM/DD')
    }

    if (momentDate && momentDate.isValid()) {
      return momentDate.tz('Asia/Dubai').format('YYYY-MM-DD')
    } else {
      return null
    }
  }

  const currencyDotToComma = (value) => {
    if (value) {
      if (typeof value === 'string') {
        return value.replace(/\./g, ',')
      } else if (typeof value === 'number') {
        return value.toString().replace(/\./g, ',')
      }
    } else {
      return null
    }
  }

  return {
    parseDate: parseDate,
    currencyDotToComma: currencyDotToComma
  }
})()

module.exports = converter
