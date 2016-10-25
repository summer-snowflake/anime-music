React = require('react')
R = React.DOM

AnimeList = React.createClass
  getInitialState: ->
    animes: []
  componentDidMount: ->
    $.ajax(
      url: this.props.url
      dataType: 'json'
      success: ((res) ->
        this.setState animes: res.animes
      ).bind(this)
      error: ((res) ->
        console.error(this.props.url, status, err.toString())
      ).bind(this)
    )
  render: ->
    R.div
      className: 'anime-list'
      this.state.animes.map (anime) ->
        React.createElement(Anime, { key: anime.id, anime: anime }, anime.title)

Anime = React.createClass
  render: ->
    R.div
      className: 'anime-title'
      this.props.anime.title

module.exports = AnimeList
