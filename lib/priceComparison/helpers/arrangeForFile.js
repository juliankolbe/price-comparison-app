const _ = require('lodash')
const pcConfig = require('../pcConfig')
const currencyDotToComma = require('./currencyDotToComma')
const parseBonus = require('./parseBonus')
const pcFormula = require('./pcFormula')

module.exports = ({ masterProductNamesKnex, priceListData, supplierNameIds, supplierProductNameIds }) => {
  // *****************************
  //  Varaiables
  // *****************************
  let records = []
  let masterHash = {}
  let skippedRecords = []

  // Create one record for each Master in the database and add it to the masterHash so that priceListData can be associated with it
  masterProductNamesKnex.forEach(master => {
    let record = Object.assign({}, pcConfig.defaultValues)
    record['si_no'] = master.id
    record['product_master_name'] = master.master_product_name
    masterHash[master.id] = record
  })
  // For each price list data record, search the matching master product name in the masterHash, take its value and mutate it by adding its data
  priceListData.forEach(data => {
    let record = masterHash[data.master_product_name_id]
    let supplierName = supplierNameIds[data.supplier_id]
    let lowerSupName = supplierName ? supplierName.toLowerCase() : undefined
    let basePrice = data.whole_sale_price
    if (record && supplierName) {
      // **************************************************************************************************************************************
      // MEDSEVEN
      // **************************************************************************************************************************************
      if (lowerSupName === 'medseven') {
        record['medseven_product_name'] = supplierProductNameIds[data.supplier_product_name_id]
        record['medseven_price'] = currencyDotToComma(basePrice)
      }
      // **************************************************************************************************************************************
      // SHARJAH
      // **************************************************************************************************************************************
      else if (lowerSupName === 'sharjah') { // eslint-disable-line
        record['sharjah_product_name'] = supplierProductNameIds[data.supplier_product_name_id]
        record['sharjah_price'] = currencyDotToComma(basePrice)
        record['moh'] = data.moh_percentage
      }
      // **************************************************************************************************************************************
      // SULTAN
      // **************************************************************************************************************************************
      else if (lowerSupName === 'sultan') { // eslint-disable-line
        let parsedBonus = parseBonus.single(data.bonus)
        let bonus1 = parsedBonus.bonus_1
        let bonus2 = parsedBonus.bonus_2
        let bonus3 = parsedBonus.bonus_3
        record['sultan_product_name'] = supplierProductNameIds[data.supplier_product_name_id]
        record['sultan_base_price'] = currencyDotToComma(basePrice)
        record['sultan_scheme'] = data.bonus
        record['sultan_price_1'] = bonus1 ? currencyDotToComma(pcFormula(basePrice, bonus1.normalAmount, bonus1.bonusAmount)) : '-'
        record['sultan_price_2'] = bonus2 ? currencyDotToComma(pcFormula(basePrice, bonus2.normalAmount, bonus2.bonusAmount)) : '-'
        record['sultan_price_3'] = bonus3 ? currencyDotToComma(pcFormula(basePrice, bonus3.normalAmount, bonus3.bonusAmount)) : '-'
        record['sultan_bonus_1'] = parsedBonus.bonusStrings.bonus_1 || '+'
        record['sultan_bonus_2'] = parsedBonus.bonusStrings.bonus_2 || '+'
        record['sultan_bonus_3'] = parsedBonus.bonusStrings.bonus_3 || '+'
      }
      // **************************************************************************************************************************************
      // TAMIMI
      // **************************************************************************************************************************************
      else if (lowerSupName === 'tamimi') { // eslint-disable-line
        let parsedBonus = parseBonus.triple({bonus_1: data['bonus_1'], bonus_2: data['bonus_2'], bonus_3: data['bonus_3']})
        let bonus1 = parsedBonus.bonus_1
        let bonus2 = parsedBonus.bonus_2
        let bonus3 = parsedBonus.bonus_3
        record['tamimi_product_name'] = supplierProductNameIds[data.supplier_product_name_id]
        record['tamimi_base_price'] = currencyDotToComma(basePrice)
        record['tamimi_price_1'] = bonus1 ? currencyDotToComma(pcFormula(basePrice, bonus1.normalAmount, bonus1.bonusAmount)) : '-'
        record['tamimi_price_2'] = bonus2 ? currencyDotToComma(pcFormula(basePrice, bonus2.normalAmount, bonus2.bonusAmount)) : '-'
        record['tamimi_price_3'] = bonus3 ? currencyDotToComma(pcFormula(basePrice, bonus3.normalAmount, bonus3.bonusAmount)) : '-'
        record['tamimi_bonus_1'] = parsedBonus.bonusStrings.bonus_1 || '+'
        record['tamimi_bonus_2'] = parsedBonus.bonusStrings.bonus_2 || '+'
        record['tamimi_bonus_3'] = parsedBonus.bonusStrings.bonus_3 || '+'
      }
    } else {
      skippedRecords.push(data)
    }
  })

  // Add all entires in the masterhash as rows to the toCsvArrayOfObject object
  _.forOwn(masterHash, (value, key) => {
    records.push(value)
  })
  return records
}
