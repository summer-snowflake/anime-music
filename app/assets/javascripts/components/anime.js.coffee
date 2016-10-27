React = require('react')
R = React.DOM

Anime = React.createClass
  render: ->
    R.div
      className: 'anime-title'
      this.props.children

module.exports = Anime
