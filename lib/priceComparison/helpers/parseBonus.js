const _ = require('lodash')

const parseBonus = (() => {
  const single = (bonusString) => {
    bonusString = bonusString.replace(/\s/g, '')
    let singleToTriple
    let res
    // TEST FOR '+' SIGN
    // Matches:
    // B-3+1
    // b=12+2
    let regex1 = /^B?(?:-|=)?\s?(\d+\+\d+),?$/i

    // Matches:
    // B-3+1,7+3
    // b=12+2,25+5
    let regex2 = /^B?(?:-|=)?\s?(\d+\+\d+),(\d+\+\d+),?$/i

    // Matches:
    // B-3+1,7+3,15+7
    // b=12+2,25+5,50+6
    let regex3 = /^B?(?:-|=)?\s?(\d+\+\d+),(\d+\+\d+),(\d+\+\d+),?$/i

    if (regex1.test(bonusString)) {
      res = bonusString.match(regex1)
      singleToTriple = { bonus_1: res[1] }
    } else if (regex2.test(bonusString)) {
      res = bonusString.match(regex2)
      singleToTriple = { bonus_1: res[1], bonus_2: res[2] }
    } else if (regex3.test(bonusString)) {
      res = bonusString.match(regex3)
      singleToTriple = { bonus_1: res[1], bonus_2: res[2], bonus_3: res[3] }
    }
    return triple(singleToTriple)
  }

  const triple = (bonusObj = {}) => {
    let parsedBonus = { bonusStrings: {} }
    let regex = /^\d+\+\d+$/
    // remove all whitespace
    let _bonusObj = _.mapValues(bonusObj, o => o.replace(/\s/g, ''))
    // filter obj to only those props matching regex
    _bonusObj = _.pickBy(_bonusObj, (value, key) => regex.test(value))

    let bonus1 = _bonusObj.bonus_1
    if (bonus1) {
      let bonus1Array = bonus1.split('+')
      parsedBonus['bonus_1'] = { normalAmount: parseInt(bonus1Array[0], 10), bonusAmount: parseInt(bonus1Array[1], 10) }
      parsedBonus['bonusStrings']['bonus_1'] = bonus1
    }
    let bonus2 = _bonusObj.bonus_2
    if (bonus2) {
      let bonus2Array = bonus2.split('+')
      parsedBonus['bonus_2'] = { normalAmount: parseInt(bonus2Array[0], 10), bonusAmount: parseInt(bonus2Array[1], 10) }
      parsedBonus['bonusStrings']['bonus_2'] = bonus2
    }
    let bonus3 = _bonusObj.bonus_3
    if (bonus3) {
      let bonus3Array = bonus3.split('+')
      parsedBonus['bonus_3'] = { normalAmount: parseInt(bonus3Array[0], 10), bonusAmount: parseInt(bonus3Array[1], 10) }
      parsedBonus['bonusStrings']['bonus_3'] = bonus3
    }
    return parsedBonus
  }

  return {
    single: single,
    triple: triple
  }
})()

module.exports = parseBonus
