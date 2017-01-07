import React, { Component, PropTypes } from 'react'
import AdminAnimeDetail from './_admin_anime_detail.js'

export default class AdminAnime extends Component {
  render() {
    return (
      <div className='adminAnimeComponent'>
        <AdminAnimeDetail url={'api/admin/animes/' + this.props.params.animeId} />
      </div>
    )
  }
}

AdminAnime.propTypes = {
  params: PropTypes.object.isRequired
}
