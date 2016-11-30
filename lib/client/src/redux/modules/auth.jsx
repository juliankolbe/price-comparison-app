import { createStructuredSelector } from 'reselect'
// import { LOCATION_CHANGE } from 'react-router-redux'

// Action types
const LOGIN = 'price-comparison/login/LOG_IN'
const LOGIN_SUCCESS = 'price-comparison/login/LOG_IN_SUCCESS'
const LOGIN_FAIL = 'price-comparison/login/LOG_IN_FAIL'
// const SAVE_TOKEN_TO_LOCAL_STORAGE = 'price-comparison/login/SAVE_TOKEN_TO_LOCAL_STORAGE'
const TOKEN_SAVED = 'price-comparison/login/TOKEN_SAVED'
const LOGGED_OUT = 'price-comparison/login/LOGGED_OUT'

const initialState = {
  loggingIn: false,
  loggedIn: false,
  token: null,
  tokenSaved: false,
  user: null
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        token: action.result.token,
        error: null
      }
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        token: null,
        error: action.error
      }
    case TOKEN_SAVED:
      return {
        ...state,
        tokenSaved: true
      }
    case LOGGED_OUT:
      return {
        ...state,
        loggedIn: false,
        token: null,
        tokenDeleted: true
      }
    default:
      return state
  }
}

// Async Action Creators
export function login (formData) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/auth/login', {
      data: formData
    })
  }
}

// THUNKS
export function saveTokenToLocalStorage () {
  return function (dispatch, getState) {
    window.localStorage.setItem('token', getState().auth.token)
    dispatch(tokenSaved())
  }
}

export function logout () {
  return function (dispatch, getState) {
    window.localStorage.removeItem('token')
    dispatch(loggedOut())
  }
}
// Action Creators
export function tokenSaved () {
  return {
    type: TOKEN_SAVED
  }
}

export function loggedOut () {
  return {
    type: LOGGED_OUT
  }
}

// Selectors
const getToken = state => state.token
const isLoggedIn = state => state.loggedIn
// Reselect memoised selector
export const selector = createStructuredSelector({
  getToken,
  isLoggedIn
})
