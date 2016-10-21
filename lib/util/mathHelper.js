const BigNumber = require('bignumber.js')

let arg1 = 23

let arg2 = 12

let arg3 = 15

// let value1 = new BigNumber(arg1)
let value2 = new BigNumber(arg2)
// let value3 = BigNumber(arg3)

let result = value2.dividedBy(arg3).times(arg1)

console.log(parseFloat(result.toString()))
