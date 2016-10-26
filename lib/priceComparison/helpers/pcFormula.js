const BigNumber = require('bignumber.js')

// WRONG: basePrice * normalAmount/(normalAmount+bonusAmount)
// RIGHT: (basePrice  * normalAmount) / (normalAmount + bonusAmount)

// Dont use ratio, first multiply and then divide to not get unnecessary irrational numbers
const pcFormula = (basePrice, normalAmount, bonusAmount) => {
  let _basePrice = new BigNumber(basePrice)
  let _normalAmount = new BigNumber(normalAmount)

  let newAmount = _normalAmount.add(bonusAmount)

  let finalValue = _basePrice.times(normalAmount).dividedBy(newAmount)
  // return to two decimal places
  return finalValue.toFixed(2)
}

module.exports = pcFormula
