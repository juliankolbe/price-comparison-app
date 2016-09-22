const React = require('react')
const Layout = require('./Layout')
const Test = require('./Test')
const { Router, browserHistory, Route, IndexRoute } = require('react-router')
const { store } = require('./Store')
const { Provider } = require('react-redux')

const myRoutes = () => (
  <Route path='/' component={Layout}>
    <IndexRoute component={Test} />
  </Route>
)

const App = React.createClass({
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {myRoutes()}
        </Router>
      </Provider>
    )
  }
})

App.Routes = myRoutes
App.History = browserHistory

module.exports = App
