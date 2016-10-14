const React = require('react')
const { Link } = require('react-router')
const axios = require('axios')
const Header = require('./Header')
const Collection = require('./Collection.jsx')
const { arrayOf, object, func, any } = React.PropTypes
const { connector } = require('./Store')

const Home = React.createClass({
  propTypes: {
    setCollectionSelected: func,
    setCollections: func,
    collectionSelected: any,
    collections: arrayOf(object)
  },
  componentDidMount () {
    axios.get('http://localhost:8080/api/collection/all')
      .then((response) => {
        this.props.setCollections(response.data)
      })
      .catch((error) => {
        console.error('axios error', error)
      })
  },
  onCollectionChanged (e) {
    this.props.setCollectionSelected(e.target.value)
  },
  handleSubmit (e) {
    e.preventDefault()
    if (this.props.collectionSelected) {
      axios({
        method: 'post',
        url: 'http://localhost:8080/api/download',
        data: {
          collectionId: this.props.collectionSelected
        }
      })
    }
  },
  render () {
    let collections
    if (this.props.collections) {
      collections = this.props.collections.map((collection) => <Collection {...collection} key={collection.id} onChange={this.onCollectionChanged} />)
    }
    return (
      <div className='container'>
        <Header />
        <form className='form' onSubmit={this.handleSubmit}>
          <div className='switch-field'>
            <div className='switch-title'>Collections</div>
            {collections}
          </div>
          <input type='submit' value='Download' />
        </form>
        <div>
          <Link to='/upload'>
            Upload
          </Link>
        </div>
        <div>
          <Link to='/admin'>
            Admin
          </Link>
        </div>
      </div>
    )
  }
})

module.exports = connector(Home)
