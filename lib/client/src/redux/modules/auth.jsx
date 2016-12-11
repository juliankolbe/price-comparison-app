import { createStructuredSelector } from 'reselect'
import cookie from 'react-cookie'
// import { LOCATION_CHANGE } from 'react-router-redux'

// Action types
const LOG_IN = 'price-comparison/auth/LOG_IN'
const LOG_IN_SUCCESS = 'price-comparison/auth/LOG_IN_SUCCESS'
const LOG_IN_FAIL = 'price-comparison/auth/LOG_IN_FAIL'
const LOAD = 'price-comparison/auth/LOAD'
const LOAD_SUCCESS = 'price-comparison/auth/LOAD_SUCCESS'
const LOAD_FAIL = 'price-comparison/auth/LOAD_FAIL'
// const SAVE_TOKEN_TO_LOCAL_STORAGE = 'price-comparison/auth/SAVE_TOKEN_TO_LOCAL_STORAGE'
const TOKEN_SAVED = 'price-comparison/auth/TOKEN_SAVED'
const TOKEN_DELETED = 'price-comparison/auth/TOKEN_DELETED'
const SET_LOGGED_OUT = 'price-comparison/auth/SET_LOGGED_OUT'
const SET_LOGGED_IN = 'price-comparison/auth/SET_LOGGED_IN'

const initialState = {
  loaded: false,
  loggingIn: false,
  loggedIn: false,
  token: null,
  tokenSaved: false,
  response: null
}

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
        loaded: true,
        loading: false,
        loggedIn: true,
        token: action.result.token
      }
    case LOAD_FAIL:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: action.error
      }
    case LOG_IN:
      return {
        ...state,
        loggingIn: true
      }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        token: action.result.token,
        loginError: null,
        response: action.result
      }
    case LOG_IN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        token: null,
        loginError: action.error
      }
    case TOKEN_SAVED:
      return {
        ...state,
        tokenSaved: true
      }
    case TOKEN_DELETED:
      return {
        ...state,
        tokenSaved: false
      }
    case SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: true
      }
    case SET_LOGGED_OUT:
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
    types: [LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAIL],
    promise: (client) => client.post('/auth/login', {
      data: formData
    })
  }
}

export function load () {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/auth/check')
  }
}

// THUNKS
export function resetToken (token) {
  return function (dispatch) {
    // if (window.localStorage.getItem('token')) {
    //   window.localStorage.removeItem('token')
    // }
    // window.localStorage.setItem('token', token)
    cookie.save('token', token, { path: '/' })
    dispatch(tokenSaved())
  }
}

export function unsetToken () {
  return function (dispatch) {
    // if (window.localStorage.getItem('token')) {
    //   window.localStorage.removeItem('token')
    // }
    cookie.remove('token', { path: '/' })
    dispatch(tokenDeleted())
  }
}

export function getToken () {
  return cookie.load('token')
}

export function saveTokenToCookie (token) {
  return function (dispatch, getState) {
    cookie.save('token', token, { path: '/' })
    dispatch(tokenSaved())
  }
}

export function saveTokenToLocalStorage (token) {
  return function (dispatch) {
    if (window.localStorage.getItem('token')) {
      window.localStorage.removeItem('token')
    }
    window.localStorage.setItem('token', token)
    dispatch(tokenSaved())
  }
}

export function logout () {
  return function (dispatch, getState) {
    // if (window.localStorage.getItem('token')) {
    //   window.localStorage.removeItem('token')
    // }(
    dispatch(unsetToken())
    dispatch(setLoggedOut())
  }
}
// Action Creators
export function tokenSaved () {
  return {
    type: TOKEN_SAVED
  }
}

export function tokenDeleted () {
  return {
    type: TOKEN_DELETED
  }
}

export function setLoggedIn () {
  return {
    type: SET_LOGGED_IN
  }
}

export function setLoggedOut () {
  return {
    type: SET_LOGGED_OUT
  }
}

// Global Selectors
export function isLoaded (globalState) {
  return globalState.auth && globalState.auth.loaded
}

// Selectors
const isLoggedIn = state => state.loggedIn
const hasLoaded = state => state.loaded
// Reselect memoised selector
export const selector = createStructuredSelector({
  isLoggedIn,
  hasLoaded
})
