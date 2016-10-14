import React, { Component } from 'react'
import { Link } from 'react-router'
// import { connect } from 'react-redux'
const { string, func, bool } = React.PropTypes
// const { connector } = require('./Store')

// @connect
export default class Header extends Component {
  render () {
    return (
      <header className='header'>
        <h1 className='brand'>
          <Link to='/' className='brand-link'>
            Back
          </Link>
        </h1>
      </header>
    )
  }
}

Header.propTypes = {
  searchTerm: string,
  setSearchTerm: func,
  showSearch: bool
}
