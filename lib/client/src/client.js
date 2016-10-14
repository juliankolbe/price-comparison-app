import React from 'react'
import ReactDOM from 'react-dom'
// import App from require('./ClientApp')
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect } from 'redux-connect'
import createStore from './redux/create.jsx'
import ApiClient from './helpers/ApiClient.jsx'
import getRoutes from './routes'
// import { useScroll } from 'react-router-scroll'

const client = new ApiClient()
// const _browserHistory = useScroll(() => browserHistory)()
const dest = document.getElementById('content')
const store = createStore(browserHistory, client, window.__data)
const history = syncHistoryWithStore(browserHistory, store)

const component = (
  // <Router render={(props) => <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />} history={history}>
  //   {getRoutes(store)}
  // </Router>
  <Router render={function (props) { return <ReduxAsyncConnect {...props} helpers={{client}} filter={function (item) { return !item.deferred }} /> }} history={history}>
    {getRoutes(store)}
  </Router>
  // <Router render={asyncComponent} history={history}>
  //   {getRoutes(store)}
  // </Router>
)

// react/jsx-no-bind bitching
// const asyncComponent = function (props) {
//   const filter = function (item) {
//     return !item.deferred
//   }
//   return (
//     <ReduxAsyncConnect {...props} helpers={{client}} filter={filter} />
//   )
// }

ReactDOM.render(
  <Provider store={store} key='provider'>
    {component}
  </Provider>,
  dest
)

if (process.env.NODE_ENV !== 'production') {
  window.React = React // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.')
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools')
  ReactDOM.render(
    <Provider store={store} key='provider'>
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  )
}

// match({ history: browserHistory, routes: getRoutes() }, (error, redirectLocation, renderProps) => {
//   if (error) {
//     return console.error('BrowserEntry error', error)
//   }
//   ReactDOM.render(<App {...renderProps} />, document.getElementById('app'))
// })
