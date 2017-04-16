/**
 * Create a hash map of an arrayOfObjects, applying default values and overriding defaults with data from those objects
 * @param  {Array} arrayOfObjects [description]
 * @param  {Object} defaultValues  Object with default values for each mapped object
 * @param  {Array} overridePairs   Value in object from objectOfArrays overrides default value in record [{recordKey: String, objectKey: String},...]
 * @param  {String} hashKey        Key of the Object in arrayOfObjects
 * @return {Object}                Hash map of arrayOfObjects
 */

const createDefaultHash = (arrayOfObjects, defaultValues, overridePairs, hashKey) => {
  // // Create one record for each Master in the database and add it to the masterHash so that priceListData can be associated with it
  // let hash = {}
  // arrayOfObjects.forEach(object => {
  //   let record = Object.assign({}, defaultValues)
  //   overridePairs.forEach(pair => {
  //     record[pair.recordKey] = object[pair.objectKey]
  //   })
  //   // record['si_no'] = master.id
  //   // record['product_master_name'] = master.master_product_name
  //   hash[object[hashKey]] = record
  // })
  // return hash
  //
  // // Master Product Name Id pairs
  // //

  return arrayOfObjects.reduce((hashMap, obj) => {
    // Assign passed in default values to a new record object
    let record = Object.assign({}, defaultValues)
    // Override defaults to use obj values
    overridePairs.forEach(pair => {
      record[pair.recordKey] = obj[pair.objectKey]
    })
    // use 'hashKey' ,passed in, of object to create actual hash key of hash map
    hashMap[obj[hashKey]] = record
    return hashMap
  }, {})
}

module.exports = createDefaultHash
