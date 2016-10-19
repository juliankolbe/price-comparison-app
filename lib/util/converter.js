const moment = require('moment-timezone')

const converter = (() => {
  const parseDate = (dateString) => {
    // #1: Sultan and Tamimi Date format
    // #2: Medseven
    let momentDate
    if (/^\w{3}(?:\.|\s)\d{1,2}$/.test(dateString)) {
      momentDate = moment(dateString.replace(/[.]/g, ' '), 'MMM DD')
    } else if (/^\d{1,2}\/\d{1,2}$/.test(dateString)) {
      momentDate = moment(dateString, 'MM/DD')
    } else {
      return null
    }
    if (momentDate.isValid()) {
      return momentDate.tz('Asia/Dubai').format('YYYY-MM-DD')
    } else {
      return null
    }
  }

  return {
    parseDate: parseDate
  }
})()

module.exports = converter
