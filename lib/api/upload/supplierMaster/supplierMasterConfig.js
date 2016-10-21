const config = require('_/config')

const supplierMasterConfig = {
  uploadSettings: {
    destination: config.path.root + '/tmp/csv',
    fileName: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.csv')
    },
    fieldName: 'csvFiles',
    maxFiles: 1
  },
  parseSettings: {
    validHeadings: ['Master', 'Medseven', 'Tamimi', 'Sharjah', 'Sultan'],
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

module.exports = supplierMasterConfig
