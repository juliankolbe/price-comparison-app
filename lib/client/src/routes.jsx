import React from 'react'
import {IndexRoute, Route} from 'react-router'
import { load as loadAuth, isLoaded as isAuthLoaded } from './redux/modules/auth'
import _ from 'lodash'
// import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Admin,
    PriceComparison,
    // Layout,
    Test,
    Upload,
    Login,
    NotFound
  } from './containers'

import TestPage from './containers/TestPage.jsx'
import { PcDownloadForm } from './components'

// Material-ui uses on tap as its faster than onclick (only for touch really but whatever)
const injectTapEventPlugin = require('react-tap-event-plugin')
injectTapEventPlugin()

export default (store) => {
  const requireLoginAndRoles = (rolesArray) => {
    return function (nextState, replace, cb) {
      function checkAuth () {
        const { auth: { loggedIn, roles } } = store.getState()
        if (!loggedIn) {
          // oops, not logged in, so can't be here!
          replace('/login')
        } else if (!_.intersection(roles, rolesArray).length) {
          console.log('Not permitted')
          replace('/')
        }
        cb()
      }

      if (store) {
        if (!isAuthLoaded(store.getState())) {
          // Load auth once, to check for valid Token
          store.dispatch(loadAuth())
          // Redundant, will never hit
          .then(checkAuth)
          // When 401 is returned, this is whats gets fired
          .catch(error => {
            if (error.message === 'Unauthorized') {
              replace('/login')
              cb()
            }
          })
        } else {
          // If auth was loaded once already, check that authorized
          checkAuth()
        }
      } else {
        // If store has not loaded yet (page refresh, first load) redirect to home so store can build up
        replace('/')
        cb()
      }
    }
  }
  const checkAlreadyLoggedIn = (nextState, replace, cb) => {
    if (store && store.getState().auth.loggedIn) {
      console.log('already logged in!')
      replace('/')
      cb()
    } else {
      cb()
    }
  }
  // const requireLogin = (nextState, replace, cb) => {
  //   function checkAuth () {
  //     const { auth: { loggedIn } } = store.getState()
  //     if (!loggedIn) {
  //       // oops, not logged in, so can't be here!
  //       replace('/login')
  //     }
  //     cb()
  //   }
  //
  //   if (store) {
  //     if (!isAuthLoaded(store.getState())) {
  //       // Load auth once, to check for valid Token
  //       store.dispatch(loadAuth())
  //       // Redundant, will never hit
  //       .then(checkAuth)
  //       // When 401 is returned, this is whats gets fired
  //       .catch(error => {
  //         if (error.message === 'Unauthorized') {
  //           replace('/login')
  //           cb()
  //         }
  //       })
  //     } else {
  //       // If auth was loaded once already, check that authorized
  //       checkAuth()
  //     }
  //   } else {
  //     // If store has not loaded yet (page refresh, first load) redirect to home so store can build up
  //     replace('/')
  //     cb()
  //   }
  // }

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path='/' component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} />

      { /* Routes requiring login */ }
      <Route onEnter={requireLoginAndRoles(['USER', 'ADMIN'])}>
        <Route path='test' component={Test} />
        <Route path='upload' component={Upload} />
        <Route path='pricecomparison' component={PriceComparison}>
          <Route path='collections' component={PcDownloadForm} />
          <Route path='pricelists' component={TestPage} />
          {/* <Route path='direct' /> */}
        </Route>
      </Route>

      { /* Admin routes */ }
      <Route onEnter={requireLoginAndRoles(['ADMIN'])}>
        <Route path='admin' component={Admin} />
      </Route>
      { /* Routes */ }
      <Route onEnter={checkAlreadyLoggedIn}>
        <Route path='login' component={Login} />
      </Route>

      { /* Catch all route */ }
      <Route path='*' component={NotFound} status={404} />
    </Route>
  )
}
