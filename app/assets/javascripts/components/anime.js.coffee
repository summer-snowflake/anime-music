Anime = React.createClass
  render: ->
    R.div
      className: 'anime-title'
      React.createElement(Panel, null, this.props.children)

module.exports = Anime
