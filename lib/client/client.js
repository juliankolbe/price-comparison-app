require('babel-register')

const config = require('_/config')
const express = require('express')
const fs = require('fs')
const _ = require('lodash')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { match, RouterContext } = require('react-router')
const { Provider } = require('react-redux')
const { store } = require('./js/Store.jsx')
const { Routes } = require('./js/ClientApp.jsx')

const baseTemplate = fs.readFileSync(config.path.lib + '/client/index.html')
const template = _.template(baseTemplate)

module.exports.load = function (app) {
  app.use('/public', express.static(config.path.publicDirectory))

  app.use((req, res) => {
    match({ routes: Routes(), location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const body = ReactDOMServer.renderToString(
          React.createElement(Provider, {store},
            React.createElement(RouterContext, renderProps)
          )
        )
        res.status(200).send(template({body}))
      } else {
        res.status(404).send('404 page')
      }
    })
  })
}
