import { createStructuredSelector } from 'reselect'
import { combineReducers } from 'redux'
import { LOCATION_CHANGE } from 'react-router-redux'
// Action types
const LOAD_COLLECTIONS = 'price-comparison/pcDownloadForm/LOAD_COLLECTIONS'
const LOAD_COLLECTIONS_SUCCESS = 'price-comparison/pcDownloadForm/LOAD_COLLECTIONS_SUCCESS'
const LOAD_COLLECTIONS_FAIL = 'price-comparison/pcDownloadForm/LOAD_COLLECTIONS_FAIL'
const SET_COLLECTION_SELECTED = 'price-comparison/pcDownloadForm/SET_COLLECTION_SELECTED'
const UNSET_COLLECTION_SELECTED = 'price-comparison/pcDownloadForm/UNSET_COLLECTION_SELECTED'
const DOWNLOAD_PC = 'price-comparison/pcDownloadForm/DOWNLOAD_PC'
const DOWNLOAD_PC_SUCCESS = 'price-comparison/pcDownloadForm/DOWNLOAD_PC_SUCCESS'
const DOWNLOAD_PC_FAIL = 'price-comparison/pcDownloadForm/DOWNLOAD_PC_FAIL'
const RESET_HAS_DOWNLOADED = 'price-comparison/pcDownloadForm/RESET_HAS_DOWNLOADED'
const RESET_COLLECTION_LOADED = 'price-comparison/pcDownloadForm/RESET_COLLECTION_LOADED'

// Initial states
const initialState = {
  collections: {
    loaded: false,
    data: []
  },
  stockRequests: {
    data: []
  },
  afterNegotiations: {
    data: []
  },
  pcDownload: {
    downloaded: false,
    collectionSelected: undefined
  }
}

// Reducers
function collections (state = initialState.collections, action = {}) {
  switch (action.type) {
    case LOAD_COLLECTIONS:
      return {
        ...state,
        loading: true
      }
    case LOAD_COLLECTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      }
    case LOAD_COLLECTIONS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      }
    case RESET_COLLECTION_LOADED:
      return {
        ...state,
        loaded: false
      }
    default:
      return state
  }
}

function stockRequests (state = initialState.stockRequests, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}

function afterNegotiations (state = initialState.afterNegotiations, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}

function pcDownload (state = initialState.pcDownload, action = {}) {
  switch (action.type) {
    case SET_COLLECTION_SELECTED:
      return {
        ...state,
        collectionSelected: action.collectionId
      }
    case UNSET_COLLECTION_SELECTED:
      return {
        ...state,
        collectionSelected: undefined
      }
    case RESET_HAS_DOWNLOADED:
      return {
        ...state,
        downloaded: false
      }
    case DOWNLOAD_PC:
      return {
        ...state,
        downloading: true
      }
    case DOWNLOAD_PC_SUCCESS:
      return {
        ...state,
        data: action.result.data,
        downloading: false,
        downloaded: true,
        downloadError: null,
        collectionSelected: undefined
      }
    case DOWNLOAD_PC_FAIL:
      return {
        ...state,
        downloading: false,
        downloaded: false,
        downloadError: action.error,
        collectionSelected: undefined
      }
    case LOCATION_CHANGE:
      return initialState.pcDownload
    default:
      return state
  }
}
// Final Reducer
export default combineReducers({
  collections,
  stockRequests,
  afterNegotiations,
  pcDownload
})

// Action Creators
export function setCollectionSelected (collectionId) {
  return {
    type: SET_COLLECTION_SELECTED,
    collectionId: collectionId
  }
}
export function unSetCollectionSelected () {
  return {
    type: UNSET_COLLECTION_SELECTED
  }
}

export function resetHasDownloaded () {
  return {
    type: RESET_HAS_DOWNLOADED
  }
}

export function resetCollectionLoaded () {
  return {
    type: RESET_COLLECTION_LOADED
  }
}
// Async Action Creators
export function loadCollections () {
  return {
    types: [LOAD_COLLECTIONS, LOAD_COLLECTIONS_SUCCESS, LOAD_COLLECTIONS_FAIL],
    promise: (client) => client.get('/collection/all')
  }
}

export function downloadPc (collectionId, stockReqId, afterNegId) {
  return {
    types: [DOWNLOAD_PC, DOWNLOAD_PC_SUCCESS, DOWNLOAD_PC_FAIL],
    promise: (client) => client.get(`/download/priceComparison/${collectionId}${stockReqId ? '/' + stockReqId : ''}/${afterNegId ? '/' + afterNegId : ''}`),
    useAxios: true,
    browserDownloadSettings: {
      filename: 'testing.csv'
    }
  }
}

// export function triggerBrowserDownload () {
//   if (browserDownloadSettings && __CLIENT__) {
//             browserDownload(result.data, browserDownloadSettings.filename)
//           }
//   return {
//     type: TRIGGER_BROWSER_DOWNLOAD,
//
//   }
// }

// Async Connect Selector
export function isLoaded (globalState) {
  return globalState.pcDownloadForm && globalState.pcDownloadForm.collections.loaded
}

// Selectors
  // Collection Selectors
const getCollections = state => state.collections.data
  // Stock Request Selectors
// const getStockRequests = state => state.stockRequests.data
  // After Negotiations Selectors
// const getAfterNegotiations = state => state.afterNegotiations.data
  // PC Download Selectors
const getCollectionSelected = state => state.pcDownload.collectionSelected
const hasDownloaded = state => state.pcDownload.downloaded
const isDownloading = state => state.pcDownload.downloading
const getDownloadedFileData = state => state.pcDownload.data
// Reselect memoised selector
export const selector = createStructuredSelector({
  getCollections,
  getCollectionSelected,
  hasDownloaded,
  getDownloadedFileData,
  isDownloading
})
