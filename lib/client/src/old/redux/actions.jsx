// Action types
const { SET_COLLECTIONS, SET_COLLECTION_SELECTED, SET_FILE_FORM_DATA, SET_SUPPLIERS, SET_SUPPLIER_NAME } = require('./actionTypes.jsx')

const setCollections = (collections) => {
  return {type: SET_COLLECTIONS, value: collections}
}

const setCollectionSelected = (collectionId) => {
  return {type: SET_COLLECTION_SELECTED, value: collectionId}
}

const setFileFormData = (fileFormData) => {
  return {type: SET_FILE_FORM_DATA, value: fileFormData}
}

const setSuppliers = (suppliers) => {
  return {type: SET_SUPPLIERS, value: suppliers}
}

const setSupplierName = (supplierName) => {
  return {type: SET_SUPPLIER_NAME, value: supplierName}
}

module.exports = {
  setCollections,
  setCollectionSelected,
  setFileFormData,
  setSuppliers,
  setSupplierName
}
