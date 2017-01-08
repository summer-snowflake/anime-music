import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../origin.js'

import AdminAnimeSeason from './_admin_anime_season'

export default class AdminAnimeSeasons extends Component {
  render() {
    return (
      <div className='adminAnimeSeasonsComponent'>
        {this.props.seasons.map((season) =>
          <AdminAnimeSeason season={season} key={season.id} />
        )}
      </div>
    )
  }
}

AdminAnimeSeasons.propTypes = {
  seasons: PropTypes.array.isRequired
}
