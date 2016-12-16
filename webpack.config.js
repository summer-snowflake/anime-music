var webpack = require('webpack')
require('dotenv').config()

module.exports = {
  entry: './app/assets/javascripts/components.js',

  output: {
    path: 'serve',
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [
    new webpack.DefinePlugin({
      DOMAIN_NAME : JSON.stringify(process.env.DOMAIN_NAME)
    })
  ],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }
}
