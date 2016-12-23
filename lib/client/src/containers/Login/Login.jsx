import React, {Component, PropTypes} from 'react'
import { reduxForm, Field } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { asyncConnect } from 'redux-connect'
import * as duck from '../../redux/modules/auth'
// import axios from 'axios'
import Helmet from 'react-helmet'
import { Grid } from 'react-bootstrap'

@connect(
  state => (duck.selector(state.auth)),
  dispatch => bindActionCreators(Object.assign({}, duck)
    , dispatch)
)
@reduxForm({
  form: 'LoginForm'
})
export default class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    login: PropTypes.func
  }

  handleSubmit = (data) => {
    console.log(data)
    this.props.login(data)
    // Dispatch login api call
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <div className='container'>
        <Helmet title='Login' />
        <Grid>
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <Field component='input' type='text' name='username' placeholder='username' />
            <Field component='input' type='password' name='password' placeholder='password' />
            <button type="submit">Submit</button>
          </form>
        </Grid>
      </div>
    )
  }
}
