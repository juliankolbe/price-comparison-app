import { createStructuredSelector } from 'reselect'

// Action Types
const SET_SUPPLIERS = 'price-comparison/admin/SET_SUPPLIERS'
const SET_SUPPLIER_NAME_INPUT = 'price-comparison/admin/SET_SUPPLIER_NAME_INPUT'

// Initional State
const initialState = {
  supplierNameInput: '',
  data: []
}

// Reducer
export default function suppliers (state = initialState, action) {
  switch (action.type) {
    case SET_SUPPLIERS:
      return {
        ...state,
        data: action.value
      }
    case SET_SUPPLIER_NAME_INPUT:
      return {
        ...state,
        supplierNameInput: action.value
      }
    default:
      return state
  }
}

// Synchronous Action Creators
export function setSuppliers (suppliers) {
  return {type: SET_SUPPLIERS, value: suppliers}
}

export function setSupplierNameInput (supplierName) {
  return {type: SET_SUPPLIER_NAME_INPUT, value: supplierName}
}

// Selectors
const getSuppliers = state => state.data
const getSupplierNameInput = state => state.supplierNameInput

// Reselect memoised selector
export const selector = createStructuredSelector({
  getSuppliers,
  getSupplierNameInput
})
