// /* global webpackIsomorphicTools */

// require('babel-register')
require('../server.babel')

// const config = require('_/config')
// const fs = require('fs')
// const _ = require('lodash')
const logger = require('_/logger')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const React = require('react')
const ReactDOM = require('react-dom/server')
const { match } = require('react-router')
const { Provider } = require('react-redux')
const { syncHistoryWithStore } = require('react-router-redux')
const createStore = require('./redux/create')
const ApiClient = require('./helpers/ApiClient')
const Html = require('./helpers/Html')
const { ReduxAsyncConnect, loadOnServer } = require('redux-connect')
const createHistory = require('react-router/lib/createMemoryHistory')
const getRoutes = require('./routes')
// const { store } = require('./js/Store.jsx')
// const { Routes } = require('./js/ClientApp.jsx')
// const store = createStore()

// const baseTemplate = fs.readFileSync(config.path.lib + '/client/index.html')
// const template = _.template(baseTemplate)

module.exports.load = function (app) {
  // app.use('/public', express.static(config.path.publicDirectory))
  app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))
  app.use(express.static(path.join(__dirname, '..', 'static')))

  app.use((req, res) => {
    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      webpackIsomorphicTools.refresh()
    }
    const client = new ApiClient(req)
    const memoryHistory = createHistory(req.originalUrl)
    const store = createStore(memoryHistory, client)
    const history = syncHistoryWithStore(memoryHistory, store)

    function hydrateOnClient () {
      // const htmlComponent = React.createElement(Html, {assets: webpackIsomorphicTools.assets(), store})
      res.send('<!doctype html>\n' +
        ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>))
        // ReactDOM.renderToString(htmlComponent))
    }

    if (__DISABLE_SSR__) {
      hydrateOnClient()
      return
    }

    match({ history, routes: getRoutes(), location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        // console.error('ROUTER ERROR:', pretty.render(error));
        logger.error('ROUTER ERROR:', error)
        res.status(500).send(error.message)
        hydrateOnClient()
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        // const body = ReactDOMServer.renderToString(
        //   React.createElement(Provider, {store},
        //     React.createElement(RouterContext, renderProps)
        //   )
        // )
        // res.status(200).send(template({body}))
        loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
          const component = (
            <Provider store={store} key='provider'>
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          )
          // const component = React.createElement(Provider, {store, key: 'provider'}, React.createElement(ReduxAsyncConnect, renderProps))
          res.status(200)

          global.navigator = {userAgent: req.headers['user-agent']}
          // const htmlComponent2 = React.createElement(Html, {assets: webpackIsomorphicTools.assets(), store, component})
          res.send('<!doctype html>\n' +
            ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>))
            // ReactDOM.renderToString(htmlComponent2))
        })
      } else {
        res.status(404).send('404 page')
      }
    })
  })
}
