// import React, { Component, PropTypes, } from 'react'
import React, { PropTypes } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import Dropzone from 'react-dropzone'

const DropzoneInput = ({ onFileDropped, name }) => {
  return (
    <Dropzone name={name} onDrop={onFileDropped}>
      <div>Try dropping some files here, or click to select files to upload.</div>
    </Dropzone>
  )
}

DropzoneInput.propTypes = {
  name: PropTypes.string.isRequired,
  onFileDropped: PropTypes.func.isRequired
}

export default DropzoneInput

// import * as duck from '../../redux/modules/fileUpload'
//
// @connect(
//   state => (duck.selector(state.fileUpload)),
//   dispatch => bindActionCreators(duck, dispatch)
// )
// export default class DropzoneInput extends Component {
//   static propTypes = {
//     addFileDropped: PropTypes.func.isRequired,
//     name: PropTypes.string.isRequired
//   }
//
//   render () {
//     const { addFileDropped, name } = this.props
//     return (
//       <Dropzone
//         name={name}
//         onDrop={function (filesToUpload, e) {
//           return addFileDropped(filesToUpload)
//           // return field.input.onChange(filesToUpload)
//         }}
//       >
//         <div>Try dropping some files here, or click to select files to upload.</div>
//       </Dropzone>
//     )
//   }
// }
