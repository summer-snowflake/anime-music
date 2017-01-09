import React, { Component, PropTypes } from 'react'
import AdminAnimeSeason from './_admin_anime_season'

export default class AdminAnimeSeasons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seasons: []
    }
  }

  render() {
    return (
      <div className='adminAnimeSeasonsComponent'>
        {this.props.seasons.map((season) =>
          <AdminAnimeSeason key={season.id} season={season} />
        )}
      </div>
    )
  }
}

AdminAnimeSeasons.propTypes = {
  seasons: PropTypes.array.isRequired
}
