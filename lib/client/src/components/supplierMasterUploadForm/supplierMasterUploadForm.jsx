import React, { Component, PropTypes, } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
// import { asyncConnect } from 'redux-connect'
import { bindActionCreators } from 'redux'
// import Dropzone from 'react-dropzone'
// import * as supplierDuck from '../../redux/modules/supplier'
import * as duck from '../../redux/modules/supplierMasterUploadForm'

import DropzoneInput from '../DropzoneInput/DropzoneInput.jsx'
// import SelectionComponent from '../SelectionComponent/SelectionComponent.jsx'

// @asyncConnect([{
//   // deferred: true,
//   promise: ({store: {dispatch, getState}}) => {
//     if (!supplierDuck.isLoaded(getState())) {
//       return dispatch(supplierDuck.load())
//     }
//   }
// }])
@connect(
  state => (Object.assign({},
    duck.selector(state.supplierMasterUploadForm)
    // supplierDuck.selector(state.supplier)
  )),
  dispatch => bindActionCreators(Object.assign({}, duck)
    , dispatch)
)
@reduxForm({
  form: 'SupplierMasterUploadForm'
})
export default class SupplierMasterUploadForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    getFilesDropped: PropTypes.array.isRequired,
    addFileDropped: PropTypes.func.isRequired,
    removeFileDropped: PropTypes.func.isRequired,
    // getSuppliers: PropTypes.array.isRequired,
    // fieldName: PropTypes.string.isRequired,
    upload: PropTypes.func.isRequired,
    store: PropTypes.object
  }

  createFileFormData = (data) => {
    let files = this.props.getFilesDropped
    console.log(files)
    let body = new FormData()
    // Add all files to the main formData object under the same key
    files.forEach((file) => {
      body.append('csvFiles', file)
    })
    return body
  }

  handleSubmit = (data) => {
    let formData = this.createFileFormData(data)
    this.props.upload(formData)
    // make post request with the returned formdata object to upload/collections
  }

  onFileDropped = (filesToUpload, e) => {
    this.props.addFileDropped(filesToUpload)
  }

  onRemoveClick = (event) => {
    event.preventDefault()
    this.props.removeFileDropped(event.target.id)
  }

  render () {
    // const styles = require('./SupplierMasterUploadForm.scss')
    const { handleSubmit } = this.props
    let filesDropped
    if (this.props.getFilesDropped) {
      filesDropped = this.props.getFilesDropped.map((file, i) =>
        <div key={i}>
          <div>
            {file.name}
          </div>
          <div>
            <button id={i} onClick={this.onRemoveClick}>Remove</button>
          </div>
        </div>
      )
    }
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div>
          <DropzoneInput name='supplierMasterFile' onFileDropped={this.onFileDropped} />
          {filesDropped}
          <button type="submit">Upload and Save</button>
        </div>
      </form>
    )
  }
}
