import PropTypes from 'prop-types'
import React, { Component } from 'react'
import AdminAnimeDetail from './_admin_anime_detail.js'
import AdminAnimeSeasons from './seasons/_admin_anime_seasons.js'

export default class AdminAnime extends Component {
  render() {
    return (
      <div className='adminAnimeComponent'>
        <AdminAnimeDetail anime_id={this.props.params.animeId} />
        <AdminAnimeSeasons anime_id={this.props.params.animeId} />
      </div>
    )
  }
}

AdminAnime.propTypes = {
  params: PropTypes.object.isRequired
}
