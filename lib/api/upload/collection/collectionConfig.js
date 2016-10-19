const config = require('_/config')

const collectionConfig = {
  uploadSettings: {
    destination: config.path.root + '/tmp/csv',
    fileName: function (req, file, cb) {
      cb(null, 'priceList' + '-' + Date.now() + '.csv')
    },
    fieldName: 'csvFiles',
    maxFiles: 20
  },
  parseSettings: {
    requiredHeadings: ['Product Name', 'Whole Sale Price'],
    validHeadings: ['Product Name', 'Expiry Date', 'Whole Sale Price', 'Retail Price', 'Stock', 'Bonus', 'Bonus1', 'Bonus2', 'Bonus3'],
    // headings: ['Product Name', 'Expiry Date', 'Whole Sale Price', 'Stock'],
    delimiter: ';',
    fields: {
      'Product Name': 'product_name',
      'Expiry Date': 'expiry_date',
      'Whole Sale Price': 'whole_sale_price',
      'Retail Price': 'retail_price',
      'Stock': 'stock',
      'Bonus': 'bonus',
      'Bonus1': 'bonus_1',
      'Bonus2': 'bonus_2',
      'Bonus3': 'bonus_3'
    },
    conversions: {
      'Whole Sale Price': 'toFloat',
      'Retail Price': 'toFloat',
      'Expiry Date': 'toDate',
      'Stock': 'toInt'
    },
    ignores: ['-']
  }
}

module.exports = collectionConfig
