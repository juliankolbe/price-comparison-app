const config = require('_/config')

module.exports = {
  context: __dirname,
  entry: './js/example/client.jsx',
  output: {
    path: config.path.publicDirectory,
    // publicPath: 'http://' + host + ':' + port + '/dist/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  watchOptions: {
    poll: true
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
      // {
      //   test: /\.scss$/,
      //   loaders: ['style', 'css', 'sass']
      // }
    ]
  }
}
