const { combineReducers } = require('redux')
const { SET_SUPPLIERS, SET_SUPPLIER_NAME } = require('./actionTypes')
// const { setSuppliers, setSupplierName } = require('actions')

const suppliers = (state = [], action) => {
  switch (action.type) {
    case SET_SUPPLIERS:
      return action.value
    default:
      return state
  }
}

const supplierName = (state = '', action) => {
  switch (action.type) {
    case SET_SUPPLIER_NAME:
      return action.value
    default:
      return state
  }
}

const reducer = combineReducers({
  suppliers,
  supplierName
})

module.exports = reducer
