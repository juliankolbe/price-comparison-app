import React, { Component, PropTypes, } from 'react'
import { reduxForm, Field } from 'redux-form'
import * as duck from '../../redux/modules/fileUpload'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const FILE_FIELD_NAME = 'files'

const renderDropzoneInput = (field) => {
  const files = field.input.value
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={function (filesToUpload, e) {
          field.addFileDropped(filesToUpload)
          return field.input.onChange(filesToUpload)
        }}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          {files.map((file, i) => <li key={i}>{file.name}</li>)}
        </ul>
      )}
    </div>
  )
}

renderDropzoneInput.propTypes = {
  getFilesDropped: PropTypes.array.isRequired,
  addFileDropped: PropTypes.func.isRequired,
  removeFileDropped: PropTypes.func.isRequired
}

@connect(
  state => (duck.selector(state.fileUpload)),
  dispatch => bindActionCreators(duck, dispatch)
)
@reduxForm({
  form: 'simple'
})
export default class App extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    getFilesDropped: PropTypes.array.isRequired,
    addFileDropped: PropTypes.func.isRequired,
    removeFileDropped: PropTypes.func.isRequired
  }

  onSubmit = (data) => {
    var body = new FormData()
    Object.keys(data).forEach((key) => {
      body.append(key, data[ key ])
    })

    console.info('POST', body, data)
    console.info('This is expected to fail:')
    fetch('http://example.com/send/', {
      method: 'POST',
      body: body,
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }

  render () {
    const {
      handleSubmit,
      reset,
    } = this.props
    require('./Test.scss')
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <label htmlFor={FILE_FIELD_NAME}>Files</label>
          <Field
            name={FILE_FIELD_NAME}
            component={renderDropzoneInput}
            props={this.props}
          />
        </div>
        <div>
          <button type="submit">
            Submit
          </button>
          <button onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}
