import { createStructuredSelector } from 'reselect'
import { LOCATION_CHANGE } from 'react-router-redux'
import parseCsvFiles from '../../csv/parseCsvFiles'
import jsonToCsv from '../../csv/jsonToCsv'
import browserDownload from '../helpers/browserDownload'

// Action types
const ADD_FILE_DROPPED = 'price-comparison/collectionUploadForm/ADD_FILE_DROPPED'
const REMOVE_FILE_DROPPED = 'price-comparison/collectionUploadForm/REMOVE_FILE_DROPPED'
const UPLOAD = 'price-comparison/collectionUploadForm/UPLOAD'
const UPLOAD_SUCCESS = 'price-comparison/collectionUploadForm/UPLOAD_SUCCESS'
const UPLOAD_FAIL = 'price-comparison/collectionUploadForm/UPLOAD_FAIL'
const SET_DATED_AT = 'price-comparison/collectionUploadForm/SET_DATED_AT'
const SET_FILE_SUPPLIER = 'price-comparison/collectionUploadForm/SET_FILE_SUPPLIER'
const PARSING_CSV_FILES = 'price-comparison/collectionUploadForm/PARSE_CSV_FILES'
const PARSING_CSV_FILES_SUCCESS = 'price-comparison/collectionUploadForm/PARSE_CSV_FILES_SUCCESS'
const PARSING_CSV_FILES_FAIL = 'price-comparison/collectionUploadForm/PARSE_CSV_FILES_FAIL'

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
    case SET_FILE_SUPPLIER:
      return {
        ...state,
        filesDropped: state.filesDropped.map((file, i) => action.id === i ? { ...file, supplier: action.supplier } : { ...file })
      }
    // case PARSING_CSV_FILES:
    //   return {
    //     ...state,
    //     filesDropped: state.filesDropped.filter(file => !file.status || file.status !== 'parsed').map(file => ({ ...file, status: 'parsing' }))
    //   }
    // case PARSING_CSV_FILES_SUCCESS:
    //   return {
    //     ...state,
    //     filesDropped: state.filesDropped.filter(file => file.status && file.status === 'parsing')
    //       .map(file => ({ ...file, status: 'parsed', parsedCsv: action.result.reduce((final, csvObj) => csvObj.fileName === file.name ? csvObj.parsedCsv : final, {}) }))
    //   }
    // case PARSING_CSV_FILES_FAIL:
    //   return {
    //     ...state,
    //     filesDropped: state.filesDropped.filter(file => file.status && file.status === 'parsing').map(file => ({ ...file, status: 'failed', error: action.error }))
    //   }
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
        uploadSuccess: action.result.success,
        filesDropped: state.filesDropped
          .map(file => ({ ...file, statsObj: action.result.data[file.name], uploaded: true })),
        error: null
      }
    case UPLOAD_FAIL:
      return {
        ...state,
        uploading: false,
        uploadSuccess: false,
        uploaded: false,
        error: action.error
      }
    case LOCATION_CHANGE:
      return initialState
    default:
      return state
  }
}

// THUNKS

export function parseCsvFilesAction (files) {
  let settings = {
    header: true,
    skipEmptyLines: true
  }
  return function (dispatch) {
    dispatch(parsingCsvFiles())
    parseCsvFiles(files, settings)
    .then(result => {
      dispatch(parsingCsvFilesSuccess(result))
    })
    .catch(error => {
      dispatch(parsingCsvFilesFail(error))
      console.log(error)
    })
  }
}

export function downloadErrorReport (errorReport, fileName) {
  return function (dispatch) {
    // dispatch(convertingCsvToJson())
    if (errorReport) {
      // convert json to csv
      let csv = jsonToCsv(errorReport)
      let downloadFileName = 'Error Report - ' + fileName
      // prompt download of csv file
      browserDownload(csv, downloadFileName)
    }
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
export function parsingCsvFiles () {
  return {
    type: PARSING_CSV_FILES
  }
}

export function parsingCsvFilesSuccess (result) {
  console.log(result)
  return {
    type: PARSING_CSV_FILES_SUCCESS,
    result: result
  }
}

export function parsingCsvFilesFail (error) {
  return {
    type: PARSING_CSV_FILES_FAIL,
    error: error
  }
}

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

export function setFileSupplier (id, supplier) {
  return {
    type: SET_FILE_SUPPLIER,
    id: id,
    supplier: supplier
  }
}

// Selectors
const getFilesDropped = state => state.filesDropped
const isUploading = state => state.uploading
const getDatedAt = state => state.datedAt
const isUploadSuccess = state => state.uploadSuccess
// Reselect memoised selector
export const selector = createStructuredSelector({
  getFilesDropped,
  isUploading,
  getDatedAt,
  isUploadSuccess
})
