import { createStructuredSelector } from 'reselect'
import { LOCATION_CHANGE } from 'react-router-redux'

const ADD_FILE_DROPPED = 'price-comparison/fileUpload/ADD_FILE_DROPPED'
const REMOVE_FILE_DROPPED = 'price-comparison/fileUpload/REMOVE_FILE_DROPPED'

const initialState = {
  filesDropped: []
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case ADD_FILE_DROPPED:
      return {
        ...state,
        filesDropped: [...state.filesDropped, action.fileDropped]
      }
    case REMOVE_FILE_DROPPED:
      return {
        ...state,
        filesDropped: [
          ...state.items.slice(0, action.removeId),
          ...state.items.slice(action.removeId + 1)
        ]
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return state
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
