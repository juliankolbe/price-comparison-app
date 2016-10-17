import { createStructuredSelector } from 'reselect'

// Action Types
// const SET_SUPPLIERS = 'price-comparison/admin/SET_SUPPLIERS'
// const SET_SUPPLIER_NAME_INPUT = 'price-comparison/admin/SET_SUPPLIER_NAME_INPUT'
const LOAD = 'price-comparison/supplier/LOAD'
const LOAD_SUCCESS = 'price-comparison/supplier/LOAD_SUCCESS'
const LOAD_FAIL = 'price-comparison/supplier/LOAD_FAIL'

// Initional State
const initialState = {
  loaded: false
}

// Reducer
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      }
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      }
    default:
      return state
  }
}

// Async Connect Selector
export function isLoaded (globalState) {
  return globalState.supplier && globalState.supplier.loaded
}

// Async Action Creators
export function load () {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/supplier/all')
  }
}

// Selectors
const getSuppliers = state => state.data

// Reselect memoised selector
export const selector = createStructuredSelector({
  getSuppliers
})
