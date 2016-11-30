import React from 'react'
import {IndexRoute, Route} from 'react-router'
// import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Admin,
    // Layout,
    Test,
    Upload,
    Login,
    NotFound
  } from './containers'

// Material-ui uses on tap as its faster than onclick (only for touch really but whatever)
const injectTapEventPlugin = require('react-tap-event-plugin')
injectTapEventPlugin()

export default (store) => {
  // const requireLogin = (nextState, replace, cb) => {
  //   function checkAuth() {
  //     const { auth: { user }} = store.getState();
  //     if (!user) {
  //       // oops, not logged in, so can't be here!
  //       replace('/');
  //     }
  //     cb();
  //   }
  //
  //   if (!isAuthLoaded(store.getState())) {
  //     store.dispatch(loadAuth()).then(checkAuth);
  //   } else {
  //     checkAuth();
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
      {/* <Route onEnter={requireLogin}>
        <Route path="chat" component={Chat}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route> */}

      { /* Routes */ }
      <Route path='login' component={Login} />
      <Route path='admin' component={Admin} />
      <Route path='test' component={Test} />
      <Route path='upload' component={Upload} />

      { /* Catch all route */ }
      <Route path='*' component={NotFound} status={404} />
    </Route>
  )
}
