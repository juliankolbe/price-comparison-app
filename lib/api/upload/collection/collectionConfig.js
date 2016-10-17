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
    // fields: {
    //   Master: 'Master',
    //   Medseven: 'Medseven',
    //   Tamimi: 'Tamimi',
    //   Sharjah: 'Sharjah',
    //   Sultan: 'Sultan'
    // },
    ignores: ['-']
  }
}

module.exports = collectionConfig
