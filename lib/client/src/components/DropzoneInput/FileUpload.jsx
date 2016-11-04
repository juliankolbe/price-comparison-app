import React, { Component, PropTypes, } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Dropzone from 'react-dropzone'

import * as duck from '../../redux/modules/fileUpload'
// import DropzoneInput from './DropzoneInput.jsx'

const { func, array, string } = PropTypes

const DropzoneInput = (field) => {
  return (
    <Dropzone
      name={field.name}
      onDrop={function (filesToUpload, e) {
        field.addFileDropped(filesToUpload)
        return field.input.onChange(filesToUpload)
      }}
    >
      <div>Try dropping some files here, or click to select files to upload.</div>
    </Dropzone>
  )
}

DropzoneInput.propTypes = {
  addFileDropped: PropTypes.func.isRequired
}

@connect(
  state => (duck.selector(state.fileUpload)),
  dispatch => bindActionCreators(duck, dispatch)
)
@reduxForm({
  form: 'simple'
})
export default class FileUpload extends Component {

  static propTypes = {
    getFilesDropped: array.isRequired,
    addFileDropped: func.isRequired,
    removeFileDropped: func.isRequired,
    fieldName: string
  }

  render () {
    let filesDropped
    if (this.props.getFilesDropped) {
      // console.log(this.props.getFilesDropped[0])
      filesDropped = this.props.getFilesDropped.map((file, i) =>
        <li key={i}>
          {file.name}
          <Field component="input" type="text" name={`file${i}Supplier`} id={`file${i}Supplier`} />
        </li>
      )
    }
    return (
      <div>
        <Field name={this.props.fieldName} component={DropzoneInput} props={this.props} />
        <ul>
          {filesDropped}
        </ul>
      </div>
    )
  }
}

// FileUpload.propTypes = {
//
// }
