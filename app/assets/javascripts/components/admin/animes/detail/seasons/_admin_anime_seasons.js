import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../../origin.js'
import AdminAnimeSeason from './_admin_anime_season'
import AdminAnimeSeasonNewField from './_admin_anime_season_new_field'

export default class AdminAnimeSeasons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seasons: []
    }
    this.loadSeasonsFromServer = this.loadSeasonsFromServer.bind(this)
  }

  componentDidMount() {
    this.loadSeasonsFromServer()
  }

  loadSeasonsFromServer() {
    fetch(origin + 'api/admin/animes/' + this.props.anime_id + '/seasons')
      .then((res) => res.json())
      .then((res) => {
        this.setState({seasons: res.seasons})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='adminAnimeSeasonsComponent'>
        <AdminAnimeSeasonNewField anime_id={this.props.anime_id} handleLoadSeasons={this.loadSeasonsFromServer} />
        {this.state.seasons.map((season) =>
          <AdminAnimeSeason key={season.id} season={season} />
        )}
      </div>
    )
  }
}

AdminAnimeSeasons.propTypes = {
  anime_id: PropTypes.string.isRequired
}
