import { Collection } from '../../components'
import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import * as duck from '../../redux/modules/home'
import axios from 'axios'
import Helmet from 'react-helmet'

const { object, func } = PropTypes

@asyncConnect([{
  // deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!duck.isLoaded(getState())) {
      return dispatch(duck.load())
    }
  }
}])
@connect(
  state => (duck.selector(state.home)),
  dispatch => bindActionCreators(duck, dispatch)
)
export default class Home extends Component {
  // componentDidMount = () => {
  //   // axios.get('http://localhost:8080/api/collection/all')
  //   //   .then((response) => {
  //   //     this.props.setCollections(response.data)
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error('axios error', error)
  //   //   })
  //   this.props.load()
  // }
  onCollectionChanged = (e) => {
    this.props.selectCollection(e.target.value)
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.getSelected) {
      axios({
        method: 'post',
        url: 'http://localhost:8080/api/download',
        data: {
          collectionId: this.props.getSelected
        }
      })
    }
  }
  render () {
    const styles = require('./Home.scss')
    let collections
    if (this.props.getCollections) {
      collections = this.props.getCollections.map((collection) => <Collection {...collection} key={collection.id} onChange={this.onCollectionChanged} />)
    }
    return (
      <div className='container'>
        <Helmet title='Home' />
        <form className='form' onSubmit={this.handleSubmit}>
          <div className={styles['switch-field']}>
            <div className={styles.switchTitle}>Collections</div>
            {collections}
          </div>
          <input type='submit' value='Download' />
        </form>
      </div>
    )
  }
}

Home.propTypes = {
  selectCollection: func,
  getSelected: func,
  // setCollections: func,
  // collectionSelected: any,
  getCollections: func,
  load: func,
  store: object
}
