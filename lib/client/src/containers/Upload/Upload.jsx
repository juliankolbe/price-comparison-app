import React, {Component, PropTypes} from 'react'
const { object, func } = PropTypes
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

// import * as duck from '../../redux/modules/home'
// import * as duck from '../redux/modules/upload'
import Helmet from 'react-helmet'

import { CollectionUploadForm } from '../../components'
import * as supplierDuck from '../../redux/modules/supplier'
import { asyncConnect } from 'redux-connect'

import { Grid } from 'react-bootstrap'
//
// @asyncConnect([{
//   // deferred: false,
//   promise: ({store}) => {
//     return Promise.resolve(0)
//   }
// }])
@asyncConnect([{
  // deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!supplierDuck.isLoaded(getState())) {
      return dispatch(supplierDuck.load())
    }
  }
}])
@connect(
  state => ({fileFormData: state.upload.data}),
  dispatch => bindActionCreators(
    Object.assign({}, supplierDuck)
    , dispatch)
)
export default class Upload extends Component {
  static propTypes = {
    resetSupplierLoaded: PropTypes.func.isRequired
  }
  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   axios({
  //     method: 'post',
  //     url: 'http://localhost:8080/api/upload/suppliermaster',
  //     data: this.props.fileFormData
  //   })
  // }
  // onFormChange = (e) => {
  //   let formData = new window.FormData() // explicit browser global used: 'window.FormData()'
  //   let files = _.values(e.target.files)
  //   console.log(e.target.files)
  //   console.log(e.target.files[0])
  //   files.forEach((file) => {
  //     formData.append('csvFiles', file)
  //   })
  //   this.props.setFileFormData(formData)
  //   console.log(files)
  //   console.log(formData)
  // }
  componentDidMount = () => {
    this.props.resetSupplierLoaded()
  }

  render () {
    return (
      <div className='container'>
        <Helmet title='Upload' />
        {/* <form className='form' ref='uploadForm' onSubmit={this.handleSubmit} encType='multipart/form-data' onChange={this.onFormChange}>
          <input type='file' id='csvFiles' name='csvFiles' multiple='multiple' accept='.csv' />
          <input type='submit' value='Upload' />

        </form> */}
        {/* <form>
          <FileUpload fieldName='files' />
          <button type="submit">Submit</button>
        </form> */}
        <Grid>
          <CollectionUploadForm />
        </Grid>
        {/* <div>
          {'Supplier Upload Form'}
        </div>
        <SupplierMasterUploadForm /> */}
      </div>
    )
  }
}

Upload.propTypes = {
  setFileFormData: func,
  fileFormData: object,
  store: object
}
