const React = require('react')
// const { Link } = require('react-router')
const axios = require('axios')
const Header = require('./Header')
const Supplier = require('./Supplier.jsx')
const { arrayOf, object, func, string } = React.PropTypes
const { connector } = require('./Store')

const Admin = React.createClass({
  propTypes: {
    setSuppliers: func,
    suppliers: arrayOf(object),
    setSupplierName: func,
    supplierName: string
  },
  getAllSuppliers () {
    axios.get('http://localhost:8080/api/supplier/all')
      .then((response) => {
        console.log(response)
        this.props.setSuppliers(response.data)
      })
      .catch((error) => {
        console.error('axios error', error)
      })
  },
  componentDidMount () {
    this.getAllSuppliers()
  },
  // onCollectionChanged (e) {
  //   this.props.setCollectionSelected(e.target.value)
  // },
  handleSubmit (e) {
    e.preventDefault()
    if (this.props.supplierName && this.props.supplierName !== '') {
      axios({
        method: 'post',
        url: 'http://localhost:8080/api/supplier',
        data: {
          supplierName: this.props.supplierName
        }
      })
      .then((response) => {
        this.getAllSuppliers()
      })
      .catch((error) => {
        console.error('axios error', error)
      })
      this.props.setSupplierName('')
    }
  },
  onChangeSupplierName (e) {
    this.props.setSupplierName(e.target.value)
  },
  render () {
    let suppliers
    if (this.props.suppliers) {
      suppliers = this.props.suppliers.map((supplier) => <Supplier {...supplier} key={supplier.id} />)
    }
    return (
      <div className='container'>
        <Header />
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
              <input type='text' onChange={this.onChangeSupplierName} value={this.props.supplierName} />
            </div>
            <div>
              <input type='submit' value='Save' />
            </div>
          </form>
        </div>
      </div>
    )
  }
})

module.exports = connector(Admin)
