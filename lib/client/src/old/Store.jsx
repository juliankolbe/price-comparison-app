const redux = require('redux')
const reactRedux = require('react-redux')

const SET_COLLECTIONS = 'setCollections'
const SET_COLLECTION_SELECTED = 'setCollectionSelected'
const SET_FILE_FORM_DATA = 'setFileFormData'
const SET_SUPPLIERS = 'setSuppliers'
const SET_SUPPLIER_NAME = 'setSupplierName'

const initialState = {
  collections: [],
  collectionSelected: undefined,
  fileFormData: undefined,
  suppliers: undefined,
  supplierName: ''
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLLECTIONS:
      return reduceCollections(state, action)
    case SET_COLLECTION_SELECTED:
      return reduceCollectionSelected(state, action)
    case SET_FILE_FORM_DATA:
      return reduceFileFormData(state, action)
    case SET_SUPPLIERS:
      return reduceSuppliers(state, action)
    case SET_SUPPLIER_NAME:
      return reduceSupplierName(state, action)
    default:
      return state
  }
}

const reduceSupplierName = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {supplierName: action.value})
  return newState
}

const reduceSuppliers = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {suppliers: action.value})
  return newState
}

const reduceCollectionSelected = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {collectionSelected: action.value})
  return newState
}

const reduceCollections = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {collections: action.value})
  return newState
}

const reduceFileFormData = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {fileFormData: action.value})
  return newState
}

const store = redux.createStore(rootReducer, initialState, redux.compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
))

const mapStateToProps = (state) => {
  return {
    collections: state.collections,
    collectionSelected: state.collectionSelected,
    fileFormData: state.fileFormData,
    suppliers: state.suppliers,
    supplierName: state.supplierName
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCollections (collections) {
    dispatch({type: SET_COLLECTIONS, value: collections})
  },
  setCollectionSelected (collectionId) {
    dispatch({type: SET_COLLECTION_SELECTED, value: collectionId})
  },
  setFileFormData (fileFormData) {
    dispatch({type: SET_FILE_FORM_DATA, value: fileFormData})
  },
  setSuppliers (suppliers) {
    dispatch({type: SET_SUPPLIERS, value: suppliers})
  },
  setSupplierName (supplierName) {
    dispatch({type: SET_SUPPLIER_NAME, value: supplierName})
  }
})

const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps)

module.exports = { connector, store, rootReducer }
