React = require 'react'
Anime = require './anime.js.coffee'
R = React.DOM

AnimeList = React.createClass
  loadAnimesFromServer: ->
    $.ajax(
      url: this.props.url
      dataType: 'json'
      success: ((res) ->
        this.setState animes: res.animes
      ).bind(this)
      error: ((xhr, status, err) ->
        console.error(this.props.url, status, err.toString())
      ).bind(this)
    )

  getInitialState: ->
    animes: []

  componentDidMount: ->
    this.loadAnimesFromServer()

  render: ->
    R.div
      className: 'anime-list'
      this.state.animes.map (anime) ->
        React.createElement(Anime, { key: anime.id, anime: anime }, anime.title)

module.exports = AnimeList
