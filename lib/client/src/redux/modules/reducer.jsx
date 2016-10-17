import { combineReducers } from 'redux'
// import multireducer from 'multireducer'
import { routerReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-connect'
import {reducer as form} from 'redux-form'

import admin from './admin.jsx'
import upload from './upload'
import home from './home.jsx'
import fileUpload from './fileUpload.jsx'
import supplier from './supplier'
import collectionUploadForm from './collectionUploadForm'

// import multireducer from 'multireducer';
// import { routerReducer } from 'react-router-redux';
// import {reducer as reduxAsyncConnect} from 'redux-async-connect';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form,

  collectionUploadForm,
  fileUpload,
  supplier,
  admin,
  upload,
  home
})
