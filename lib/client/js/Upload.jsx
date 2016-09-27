const React = require('react')
// const { Link } = require('react-router')
const axios = require('axios')
const Header = require('./Header')
const _ = require('lodash')
const { func, object } = React.PropTypes
const { connector } = require('./Store')

const Upload = React.createClass({
  propTypes: {
    setFileFormData: func,
    fileFormData: object
  },
  handleSubmit (e) {
    e.preventDefault()
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/upload/suppliermaster',
      data: this.props.fileFormData
    })
  },
  onFormChange (e) {
    let formData = new FormData()
    let files = _.values(e.target.files)
    files.forEach((file) => {
      formData.append('csvFiles', file)
    })
    this.props.setFileFormData(formData)
    console.log(files)
    console.log(formData)
  },
  render () {
    return (
      <div className='container'>
        <Header />
        <form className='form' ref='uploadForm' onSubmit={this.handleSubmit} encType='multipart/form-data' onChange={this.onFormChange}>
          <input type='file' id='csvFiles' name='csvFiles' multiple='multiple' accept='.csv' />
          <input type='submit' value='Upload' />
        </form>
      </div>
    )
  }
})

module.exports = connector(Upload)
