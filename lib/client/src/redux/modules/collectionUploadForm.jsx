import { createStructuredSelector } from 'reselect'
import { LOCATION_CHANGE } from 'react-router-redux'

// Action types
const ADD_FILE_DROPPED = 'price-comparison/collectionUploadForm/ADD_FILE_DROPPED'
const REMOVE_FILE_DROPPED = 'price-comparison/collectionUploadForm/REMOVE_FILE_DROPPED'
const UPLOAD = 'price-comparison/collectionUploadForm/UPLOAD'
const UPLOAD_SUCCESS = 'price-comparison/collectionUploadForm/UPLOAD_SUCCESS'
const UPLOAD_FAIL = 'price-comparison/collectionUploadForm/UPLOAD_FAIL'
const SET_DATED_AT = 'price-comparison/collectionUploadForm/SET_DATED_AT'

const initialState = {
  filesDropped: [],
  uploaded: false,
  datedAt: null
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case SET_DATED_AT:
      return {
        ...state,
        datedAt: action.date
      }
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
    promise: (client) => client.post('/upload/collection', {
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

export function setDatedAt (date) {
  return {
    type: SET_DATED_AT,
    date: date
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
const isUploading = state => state.uploading
const getDatedAt = state => state.datedAt
// Reselect memoised selector
export const selector = createStructuredSelector({
  getFilesDropped,
  isUploading,
  getDatedAt
})
