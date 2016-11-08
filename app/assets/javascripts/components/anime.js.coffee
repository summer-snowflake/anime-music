Anime = React.createClass
  render: ->
    R.div
      className: 'panel panel-default anime-title'
      R.div
        className: 'panel-body'
        this.props.children

module.exports = Anime
