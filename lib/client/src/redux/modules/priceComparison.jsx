import { createStructuredSelector } from 'reselect'

const SELECTED = 'price-comparison/priceComparison/SELECTED'
const LOAD = 'price-comparison/priceComparison/LOAD'
const LOAD_SUCCESS = 'price-comparison/priceComparison/LOAD_SUCCESS'
const LOAD_FAIL = 'price-comparison/priceComparison/LOAD_FAIL'
const DOWNLOAD_PC = 'price-comparison/priceComparison/DOWNLOAD_PC'
const DOWNLOAD_PC_SUCCESS = 'price-comparison/priceComparison/DOWNLOAD_PC_SUCCESS'
const DOWNLOAD_PC_FAIL = 'price-comparison/priceComparison/DOWNLOAD_PC_FAIL'

// const EDIT_START = 'redux-example/widgets/EDIT_START';
// const EDIT_STOP = 'redux-example/widgets/EDIT_STOP';
// const SAVE = 'redux-example/widgets/SAVE';
// const SAVE_SUCCESS = 'redux-example/widgets/SAVE_SUCCESS';
// const SAVE_FAIL = 'redux-example/widgets/SAVE_FAIL';

const initialState = {
  loaded: false,
  selected: undefined,
  data: []
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case SELECTED:
      return {
        ...state,
        selected: action.collection
      }
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
    case DOWNLOAD_PC:
      return {
        ...state,
        downloading: true
      }
    case DOWNLOAD_PC_SUCCESS:
      return {
        ...state,
        downloading: false,
        downloaded: true,
        downloadError: null
      }
    case DOWNLOAD_PC_FAIL:
      return {
        ...state,
        downloading: false,
        downloaded: false,
        downloadError: action.error
      }
    default:
      return state
  }
}

// Async Connect Selector
export function isLoaded (globalState) {
  return globalState.home && globalState.home.loaded
}

// Action Creators
export function load () {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/collection/all')
  }
}

export function downloadPC ({ collectionId, stockReqId, afterNegId }) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/priceComparison/${collectionId}${stockReqId ? '/' + stockReqId : ''}/${afterNegId ? '/' + afterNegId : ''}`)
  }
}

export function selectCollection (collection) {
  return {
    type: SELECTED,
    collection: collection
  }
}

// Selectors
const getCollections = state => state.data
const getSelected = state => state.selected
// Reselect memoised selector
export const selector = createStructuredSelector({
  getCollections,
  getSelected
})

// export function isLoaded(globalState) {
//   return globalState.widgets && globalState.widgets.loaded;
// }
//
// export function load() {
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: (client) => client.get('/widget/load/param1/param2') // params not used, just shown as demonstration
//   };
// }
//
// export function save(widget) {
//   return {
//     types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
//     id: widget.id,
//     promise: (client) => client.post('/widget/update', {
//       data: widget
//     })
//   };
// }
//
// export function editStart(id) {
//   return { type: EDIT_START, id };
// }
//
// export function editStop(id) {
//   return { type: EDIT_STOP, id };
// }
