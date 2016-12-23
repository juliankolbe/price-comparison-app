import { combineReducers } from 'redux'
// import multireducer from 'multireducer'
import { routerReducer } from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-connect'
import {reducer as form} from 'redux-form'

import admin from './admin'
import upload from './upload'
import home from './home'
// import fileUpload from './fileUpload.jsx'
import supplier from './supplier'
import collectionUploadForm from './collectionUploadForm'
import supplierMasterUploadForm from './supplierMasterUploadForm'
import pcDownloadForm from './pcDownloadForm'
import auth from './auth'
import priceComparison from './priceComparison'

// import multireducer from 'multireducer';
// import { routerReducer } from 'react-router-redux';
// import {reducer as reduxAsyncConnect} from 'redux-async-connect';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form,

  pcDownloadForm,
  supplierMasterUploadForm,
  collectionUploadForm,
  // fileUpload,
  supplier,
  priceComparison,
  admin,
  upload,
  home,
  auth
})
