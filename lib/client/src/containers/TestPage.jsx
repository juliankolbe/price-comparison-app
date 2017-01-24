import React, {Component} from 'react'

// import * as duck from '../../redux/modules/home'
// import * as duck from '../redux/modules/upload'
import Helmet from 'react-helmet'

export default class TestPage extends Component {
  render () {
    return (
      <div className='container'>
        <Helmet title='Test Page' />
        <div>Test Page</div>
      </div>
    )
  }
}
