import Papa from 'papaparse'

export default function jsonToCsv (json, config) {
  let unparseConfig = config || { delimiter: ';' }
  return Papa.unparse(json, unparseConfig)
}
