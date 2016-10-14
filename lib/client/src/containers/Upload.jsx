import React, {Component, PropTypes} from 'react'
const { object, func } = PropTypes
// import { Link } from 'react-router'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

import * as duck from '../redux/modules/upload'
import axios from 'axios'
import _ from 'lodash' // maybe import lodash as _
import Helmet from 'react-helmet'

@connect(
  state => ({fileFormData: state.upload.data}),
  dispatch => bindActionCreators(duck, dispatch)
)
export default class Upload extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/upload/suppliermaster',
      data: this.props.fileFormData
    })
  }
  onFormChange = (e) => {
    let formData = new window.FormData() // explicit browser global used: 'window.FormData()'
    let files = _.values(e.target.files)
    console.log(e.target.files)
    console.log(e.target.files[0])
    files.forEach((file) => {
      formData.append('csvFiles', file)
    })
    this.props.setFileFormData(formData)
    console.log(files)
    console.log(formData)
  }
  render () {
    return (
      <div className='container'>
        <Helmet title='Upload' />
        <form className='form' ref='uploadForm' onSubmit={this.handleSubmit} encType='multipart/form-data' onChange={this.onFormChange}>
          <input type='file' id='csvFiles' name='csvFiles' multiple='multiple' accept='.csv' />
          <input type='submit' value='Upload' />
        </form>
      </div>
    )
  }
}

Upload.propTypes = {
  setFileFormData: func,
  fileFormData: object
}
