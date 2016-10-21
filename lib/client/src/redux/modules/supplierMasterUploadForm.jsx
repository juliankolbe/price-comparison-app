import { createStructuredSelector } from 'reselect'
import { LOCATION_CHANGE } from 'react-router-redux'

// Action types
const ADD_FILE_DROPPED = 'price-comparison/supplierMasterUploadForm/ADD_FILE_DROPPED'
const REMOVE_FILE_DROPPED = 'price-comparison/supplierMasterUploadForm/REMOVE_FILE_DROPPED'
const UPLOAD = 'price-comparison/supplierMasterUploadForm/UPLOAD'
const UPLOAD_SUCCESS = 'price-comparison/supplierMasterUploadForm/UPLOAD_SUCCESS'
const UPLOAD_FAIL = 'price-comparison/supplierMasterUploadForm/UPLOAD_FAIL'

const initialState = {
  filesDropped: [],
  uploaded: false
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case ADD_FILE_DROPPED:
      return {
        ...state,
        filesDropped: [...state.filesDropped, ...action.fileDropped]
      }
    case REMOVE_FILE_DROPPED:
      return {
        ...state,
        filesDropped: [
          ...state.filesDropped.slice(0, action.removeId),
          ...state.filesDropped.slice(action.removeId + 1)
        ]
      }
    case UPLOAD:
      return {
        ...state,
        uploading: true
      }
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false,
        uploaded: true,
        uploadResponse: action.response,
        error: null
      }
    case UPLOAD_FAIL:
      return {
        ...state,
        uploading: false,
        uploaded: false,
        uploadResponse: null,
        error: action.error
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return state
  }
}

// Async Action Creators
export function upload (formData) {
  return {
    types: [UPLOAD, UPLOAD_SUCCESS, UPLOAD_FAIL],
    promise: (client) => client.post('/upload/suppliermaster', {
      data: formData
    })
  }
}

// Action Creators
export function addFileDropped (fileDropped) {
  return {
    type: ADD_FILE_DROPPED,
    fileDropped: fileDropped
  }
}

export function removeFileDropped (removeId) {
  return {
    type: REMOVE_FILE_DROPPED,
    removeId: removeId
  }
}

// Selectors
const getFilesDropped = state => state.filesDropped
// Reselect memoised selector
export const selector = createStructuredSelector({
  getFilesDropped
})
