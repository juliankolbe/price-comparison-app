const SET_FILE_FORM_DATA = 'price-comparison/upload/SET_FILE_FORM_DATA'

const initialState = {
  data: undefined
}

export default function upload (state = initialState, action) {
  switch (action.type) {
    case SET_FILE_FORM_DATA:
      return {
        ...state,
        data: action.value
      }
    default:
      return state
  }
}

export function setFileFormData (fileFormData) {
  return {type: SET_FILE_FORM_DATA, value: fileFormData}
}
