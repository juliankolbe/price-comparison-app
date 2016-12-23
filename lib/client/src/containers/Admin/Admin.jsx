import { Supplier } from '../../components'
import React, {Component, PropTypes} from 'react'
const { func } = PropTypes
// import { Link } from 'react-router'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import * as duck from '../../redux/modules/admin'
import axios from 'axios'
import Helmet from 'react-helmet'

@connect(
  state => (duck.selector(state.admin)),
  dispatch => bindActionCreators(duck, dispatch)
)
export default class Admin extends Component {
  getAllSuppliers = () => {
    axios.get('http://localhost:8080/api/supplier/all')
      .then((response) => {
        console.log(response)
        this.props.setSuppliers(response.data)
      })
      .catch((error) => {
        console.error('axios error', error)
      })
  }
  componentDidMount = () => {
    this.getAllSuppliers()
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.getSupplierNameInput && this.props.getSupplierNameInput !== '') {
      let settings = {
        method: 'post',
        url: 'http://localhost:8080/api/supplier',
        data: {
          supplierName: this.props.getSupplierNameInput
        }
      }
      if (window.localStorage.token) {
        settings.headers = {'Authorization': window.localStorage.token}
      }
      axios(settings)
      .then((response) => {
        this.getAllSuppliers()
      })
      .catch((error) => {
        console.error('axios error', error)
      })
      this.props.setSupplierNameInput('')
    }
  }
  onChangeSupplierName = (e) => {
    this.props.setSupplierNameInput(e.target.value)
  }
  render () {
    require('./Admin.scss')
    const { getSupplierNameInput, getSuppliers } = this.props
    let suppliers
    if (getSuppliers && getSuppliers instanceof Array) {
      suppliers = getSuppliers.map((supplier) => <Supplier {...supplier} key={supplier.id} />)
    }
    return (
      <div className='container'>
        <Helmet title='Admin' />
        <div>
          <table cellSpacing='0'>
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {suppliers}
            </tbody>
          </table>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              {'Supplier Name '}
              <input type='text' onChange={this.onChangeSupplierName} value={getSupplierNameInput} />
            </div>
            <div>
              <input type='submit' value='Save' />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Admin.propTypes = {
  setSuppliers: func,
  getSuppliers: func,
  setSupplierNameInput: func,
  getSupplierNameInput: func
}
