React = require('react')

R = React.DOM
Widgets = React.createClass
  render: ->
    R.div (name:'sample'), 'Hello World'

module.exports = Widgets
