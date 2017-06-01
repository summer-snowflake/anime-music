import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
    fetch(origin + 'api/admin/animes/' + this.props.anime_id + '/seasons', {
      headers: {'Authorization': 'Token token=' + localStorage.getItem('access_token')}
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({anime_title: res.anime_title, seasons: res.seasons})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='adminAnimeSeasonsComponent'>
        <AdminAnimeSeasonNewField anime_id={this.props.anime_id} anime_title={this.state.anime_title} handleLoadSeasons={this.loadSeasonsFromServer} />
        {this.state.seasons.map((season) =>
          <AdminAnimeSeason anime_title={this.state.anime_title} handleLoad={this.loadSeasonsFromServer} key={season.id} season={season} />
        )}
      </div>
    )
  }
}

AdminAnimeSeasons.propTypes = {
  anime_id: PropTypes.string.isRequired
}
