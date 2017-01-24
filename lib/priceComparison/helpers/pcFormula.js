const BigNumber = require('bignumber.js')

// WRONG: basePrice * normalAmount/(normalAmount+bonusAmount)
// RIGHT: (basePrice  * normalAmount) / (normalAmount + bonusAmount)

// Dont use ratio, first multiply and then divide to not get unnecessary irrational numbers
const pcFormula = (basePrice, normalAmount, bonusAmount) => {
  // Base price validation
  if (isNaN(parseFloat(basePrice))) {
    throw new TypeError('Base price is not a number')
  }
  if (!/^(\d+.\d{1,2}|\d+)$/.test(basePrice)) {
    throw new TypeError('Base price is not a 2 decimal point number')
  }
  // normalAmount Validation
  if (!/^\d+$/.test(normalAmount)) {
    throw new TypeError('Normal Amount is not a number')
  }
  // bonusAmount Validation
  if (!/^\d+$/.test(bonusAmount)) {
    throw new TypeError('Bonus Amount is not a number')
  }

  let _basePrice = new BigNumber(basePrice)
  let _normalAmount = new BigNumber(normalAmount)

  let newAmount = _normalAmount.add(bonusAmount)

  let finalValue = _basePrice.times(normalAmount).dividedBy(newAmount)
  // return to two decimal places
  return finalValue.toFixed(2)
}

module.exports = pcFormula
