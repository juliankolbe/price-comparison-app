import { combineReducers } from 'redux'
// import multireducer from 'multireducer'
import { routerReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-connect'
import {reducer as form} from 'redux-form'

import admin from './admin.jsx'
import upload from './upload.jsx'
import home from './home.jsx'
import fileUpload from './fileUpload.jsx'

// import multireducer from 'multireducer';
// import { routerReducer } from 'react-router-redux';
// import {reducer as reduxAsyncConnect} from 'redux-async-connect';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form,

  fileUpload,
  admin,
  upload,
  home
})
