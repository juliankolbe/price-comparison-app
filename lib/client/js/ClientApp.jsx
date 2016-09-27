const React = require('react')
const Layout = require('./Layout')
const Upload = require('./Upload')
const Admin = require('./Admin')
const Test = require('./Test')
const { Router, browserHistory, Route, IndexRoute } = require('react-router')
const { store } = require('./Store')
const { Provider } = require('react-redux')

const myRoutes = () => (
  <Route path='/' component={Layout}>
    <IndexRoute component={Test} />
    <Route path='/upload' component={Upload} />
    <Route path='/admin' component={Admin} />
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
