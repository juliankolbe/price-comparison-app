
class Bonus {

  constructor (scheme = null) {
    this.originalScheme = scheme
    this.scheme = this.originalScheme
    this._type = null
    this.valid = false
    this.bonusStrings = null
    this.bonusPairs = null
    this.bonusAmounts = null
    this.normalAmounts = null
    this._parse()
  }

  isValid () {
    return this.valid
  }
  getScheme () {
    return this.scheme
  }
  getOriginalScheme () {
    return this.originalScheme
  }
  getBonusStrings () {
    return this.bonusStrings
  }
  getBonusPairs () {
    return this.bonusPairs
  }
  getNormalAmounts () {
    return this.normalAmounts
  }
  getBonusAmounts () {
    return this.bonusAmounts
  }

  _parse () {
    this._detectType()
    this._removeWhiteSpace()
    this._extractBonusStrings()
    this._extractBonusPairs()
    this._assignAmounts()
    if (this.normalAmounts) {
      this.valid = true
    }
    return
  }

  _detectType () {
    if (this.scheme instanceof Array) {
      this._type = 'triple'
    }
    else if (typeof this.scheme === typeof 'String' ) { // eslint-disable-line
      this._type = 'single'
    }
    return
  }

  _removeWhiteSpace () {
    if (this._type && this._type === 'triple') {
      this.scheme = this.scheme.map(bonus => bonus.replace(/\s/g, ''))
    }
    else if (this._type && this._type === 'single') { // eslint-disable-line
      this.scheme = this.scheme.replace(/\s/g, '')
    }
    return
  }

  _extractBonusStrings () {
    if (this._type === 'triple') {
      this.bonusStrings = this._matchTriple(this.scheme)
    }
    else if (this._type === 'single') { // eslint-disable-line
      this.bonusStrings = this._matchSingle(this.scheme)
    }
    return
  }

  _extractBonusPairs () {
    if (this.bonusStrings) {
      this.bonusPairs = this._splitBoni(this.bonusStrings)
    }
    return
  }

  _assignAmounts () {
    if (this.bonusPairs) {
      let amounts = this.bonusPairs.reduce((amounts, bonusPair) => {
        amounts[0].push(bonusPair[0])
        amounts[1].push(bonusPair[1])
        return amounts
      }, [[], []])
      this.normalAmounts = amounts[0]
      this.bonusAmounts = amounts[1]
    }
    return
  }

  _matchSingle (scheme) {
    let regexes = [
      /^B?(?:-|=)?\s?(\d+\+\d+),?$/i,                       // Match one Bonus
      /^B?(?:-|=)?\s?(\d+\+\d+),(\d+\+\d+),?$/i,            // Match two
      /^B?(?:-|=)?\s?(\d+\+\d+),(\d+\+\d+),(\d+\+\d+),?$/i  // Match three
    ]
    let match = scheme.match(regexes[0]) || scheme.match(regexes[1]) || scheme.match(regexes[2])
    return match ? match.slice(1) : match
  }

  _matchTriple (scheme) {
    let regex = /^\d+\+\d+$/
    let match = scheme.filter(e => regex.test(e)).map(bonusString => bonusString.match(regex)[0]).slice()
    return match.length > 0 ? match : null
  }

  _splitBoni (bonusStrings) {
    return bonusStrings.map(bonusString => bonusString.split('+'))
  }

}

module.exports = Bonus
