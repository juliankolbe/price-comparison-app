import { PcDownloadForm } from '../../components'
import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import * as duck from '../../redux/modules/priceComparison'
import * as pcDownloadFormDuck from '../../redux/modules/pcDownloadForm'
// import axios from 'axios'
import Helmet from 'react-helmet'
import { Grid } from 'react-bootstrap'

@asyncConnect([{
  // deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    // if (!duck.isLoaded(getState())) {
    //   return dispatch(duck.load())
    // }
    const promises = []

    if (!duck.isLoaded(getState())) {
      promises.push(dispatch(duck.load()))
    }
    if (!pcDownloadFormDuck.isLoaded(getState())) {
      promises.push(dispatch(pcDownloadFormDuck.loadCollections()))
    }

    return Promise.all(promises)
  }
}])
@connect(
  state => (duck.selector(state.home)),
  dispatch => bindActionCreators(Object.assign({}, duck, pcDownloadFormDuck)
    , dispatch)
)
export default class PriceComparison extends Component {

  static propTypes = {
    selectCollection: PropTypes.func,
    getSelected: PropTypes.func,
    // setCollections: func,
    // collectionSelected: any,
    getCollections: PropTypes.array,
    load: PropTypes.func,
    store: PropTypes.object,
    resetCollectionLoaded: PropTypes.func
  }

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
  componentDidMount = () => {
    this.props.resetCollectionLoaded()
  }
  // onCollectionChanged = (e) => {
  //   this.props.selectCollection(e.target.value)
  // }
  // handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (this.props.getSelected) {
  //     axios({
  //       method: 'post',
  //       url: 'http://localhost:8080/api/download',
  //       data: {
  //         collectionId: this.props.getSelected
  //       }
  //     })
  //   }
  // }
  render () {
    // const styles = require('./Home.scss')
    // let collections
    // if (this.props.getCollections) {
    //   collections = this.props.getCollections.map((collection) => <Collection {...collection} key={collection.id} onChange={this.onCollectionChanged} />)
    // }
    return (
      <div className='container'>
        <Helmet title='Price Comparison' />
        <Grid>
          <PcDownloadForm />
        </Grid>
        {/* <form className='form' onSubmit={this.handleSubmit}>
          <div className={styles['switch-field']}>
            <div className={styles.switchTitle}>Collections</div>
            {collections}
          </div>
          <input type='submit' value='Download' />
        </form> */}
      </div>
    )
  }
}
