import React, { Component, PropTypes } from 'react'
import AdminAnimeDetail from './admin_anime_detail.js'

export default class AdminAnime extends Component {
  render() {
    return (
      <div>
        <AdminAnimeDetail url={'/api/admin/animes/' + this.props.params.animeId} />
      </div>
    )
  }
}

AdminAnime.propTypes = {
  params: PropTypes.string.isRequired
}
