AdminAnimeRow = require './admin_anime_row.js.coffee'

AdminAnimesTable = React.createClass
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
    R.table
      className: 'table admin-animes-list'
      React.createElement(
        'tbody'
        null
        this.state.animes.map (anime) ->
          React.createElement(
            AdminAnimeRow
            key: anime.id, anime: anime
            anime.title
          )
      )

module.exports = AdminAnimesTable
