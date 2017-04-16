/* eslint-env mocha */

const assert = require('assert')
// const sinon = require('sinon')
// const fetchIdNamePairs = require('../helpers/fetchIdNamePairs')
const priceListData = require('./test_data/price_list_data')
const arrangeForFile = require('../helpers/arrangeForFile')
const ArrangeProcess = require('../processes/arrange')
const output = require('./test_data/to_csv_output')

const supplierNameIds = {
  '1': 'Tamimi',
  '2': 'Medseven',
  '3': 'Sharjah',
  '4': 'Sultan'
}

const supplierProductNameIds = {
  3038: 'AIRFAST 10MG TABLET 30\'S same as SINGULAIR', // sharjah
  3032: 'AERIUS SYR 0.5MG/ML 150ML', // sharjah
  3030: 'AERIUS 5MG TAB. 30S', // sharjah
  2980: 'AN BB TOOTH \'N\' GUM WIPE', // sharjah
  145: 'ASPIMED 75MG TAB 56S', // sultan
  143: 'GLUCOSAMNE GEL/JOINT COMP', // sultan
  141: 'BIO FREEZ GEL', // sultan
  139: 'BIOFREEZE GEL' // sultan
}

const masterProductNamesKnex = [
  { id: 2592, 'master_product_name': 'AIRFAST 10MG 30S TAB' },
  { id: 2590, 'master_product_name': 'AERIUS SYRUP 150ML' },
  { id: 2589, 'master_product_name': 'AERIUS 5MG TAB 30"S' },
  { id: 2564, 'master_product_name': 'ADOL 120MG/5 SYRUP 100ML' },
  { id: 93, 'master_product_name': '21 CEN HERBL SLM LMN-LIM 24BAG' },
  { id: 94, 'master_product_name': '21 CEN HERBL SLM NATURL 24BAG' },
  { id: 95, 'master_product_name': '21 CEN HERBL SLM ORNG SPIC TEA' },
  { id: 96, 'master_product_name': '21 CEN HERBL SLM PEACH-APRI 24' }
]

// sinon.stub(fetchIdNamePairs).yields({ supplierNameIds, masterProductNamesKnex, supplierProductNameIds })

// describe('Arrange for File', function () {
//   let arrangeProcess
//   before(function () {
//     arrangeProcess = new ArrangeProcess({ supplierNameIds, masterProductNamesKnex, supplierProductNameIds, priceListData })
//   })
//   it('should equal to output file', function () {
//     // assert.deepEqual(arrangeForFile({ supplierNameIds, masterProductNamesKnex, supplierProductNameIds, priceListData }), output)
//     assert.deepEqual(arrangeProcess.createDataForCsvFile(), output)
//   })
// })
