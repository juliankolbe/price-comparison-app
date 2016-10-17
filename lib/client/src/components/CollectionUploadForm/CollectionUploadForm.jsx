import React, { Component, PropTypes, } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
// import { asyncConnect } from 'redux-connect'
import { bindActionCreators } from 'redux'
// import Dropzone from 'react-dropzone'
import * as supplierDuck from '../../redux/modules/supplier'
import * as duck from '../../redux/modules/collectionUploadForm'

import DropzoneInput from '../FileUpload/DropzoneInput.jsx'
import SelectionComponent from '../SelectionComponent/SelectionComponent.jsx'

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
    duck.selector(state.collectionUploadForm),
    supplierDuck.selector(state.supplier)
  )),
  dispatch => bindActionCreators(Object.assign({}, duck, supplierDuck)
    , dispatch)
)
@reduxForm({
  form: 'CollectionUploadForm'
})
export default class CollectionUploadForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    getFilesDropped: PropTypes.array.isRequired,
    addFileDropped: PropTypes.func.isRequired,
    removeFileDropped: PropTypes.func.isRequired,
    getSuppliers: PropTypes.array.isRequired,
    // fieldName: PropTypes.string.isRequired,
    upload: PropTypes.func.isRequired,
    store: PropTypes.object
  }

  createFileFormData = (data) => {
    let files = this.props.getFilesDropped
    let selectData = {}

    // Create object arraning formdata with its associated files
    let supplierSelects = Object.keys(data).filter((e) => /^supplierForList\d+$/.test(e))
    supplierSelects.forEach((selectKey) => {
      let fileKey = selectKey.match(/(\d+)$/)[1]
      selectData[files[fileKey].name] = {
        supplier: data[selectKey].value
      }
    })
    let body = new FormData()
    // Add all files to the main formData object under the same key
    files.forEach((file) => {
      body.append('csvFiles', file)
    })
    // Transform file associated form data back to JSON and add it to the main formData object
    body.append('data', JSON.stringify(selectData))

    return body
  }

  handleSubmit = (data) => {
    console.log(data)
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
    const styles = require('./CollectionUploadForm.scss')
    const { handleSubmit, getSuppliers } = this.props
    let filesDropped
    let options = {}
    if (getSuppliers) {
      options = getSuppliers.map((supplierDBObj, i) => ({value: supplierDBObj.name, label: supplierDBObj.name}))
    }
    if (this.props.getFilesDropped) {
      filesDropped = this.props.getFilesDropped.map((file, i) =>
        <div key={i} className={styles.fileDroppedDiv}>
          <div className={styles.fileDroppedDivFileName}>
            {file.name}
          </div>
          <div className={styles.fileDroppedDivSelect}>
            <Field component={SelectionComponent} name={`supplierForList${i}`} options={options} label='Supplier' placeholder='Supplier...' />
          </div>
          <div className={styles.fileDroppedDivRemoveButton}>
            <button id={i} onClick={this.onRemoveClick}>Remove</button>
          </div>
        </div>
      )
    }
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div>
          <DropzoneInput name='files' onFileDropped={this.onFileDropped} />
          {filesDropped}
          <button type="submit">Upload and Save</button>
        </div>
      </form>
    )
  }
}

// FileUpload.propTypes = {
//
// }
