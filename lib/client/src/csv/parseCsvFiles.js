import Papa from 'papaparse'
import Promise from 'bluebird'

Papa.parsePromise = function (file, settings = {}) {
  return new Promise(function (resolve, reject) {
    settings.complete = resolve
    settings.error = reject
    Papa.parse(file, settings)
  })
}

export default function parseCsvFiles (files, settings) {
  // let filePromises = files.map(file => Papa.parsePromise(file))
  return Promise.reduce(files, (final, file) => {
    return Papa.parsePromise(file.file, settings).then(output => {
      return final.concat({fileName: file.name, parsedCsv: output})
    })
  }, [])
}

//
// Promise.reduce(req.files, (final, file) => {
//   let fileParseSettings = Object.assign({}, parseSettings, {source: file.path, fileName: file.originalname})
//   return simpleParser.simpleParse(fileParseSettings).then((outputObj) => {
//     // return Object.assign(final, outputObj)
//     return final.concat([outputObj])
//   })
// }, []).then((final) => {
//   req.parsedCsv = final
//   next()
//   return null
// })
// .catch((e) => {
//   e.statusCode = 422
//   next(e)
// })
