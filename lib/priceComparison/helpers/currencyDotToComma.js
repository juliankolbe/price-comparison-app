// Convert 13.98 to 13,98 etc...

module.exports = (value) => {
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
