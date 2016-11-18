import React, { Component } from 'react'
import AdminAnimeDetail from './admin_anime_detail.jsx'

export default class AdminAnime extends Component {
  render() {
    return (
      <div>
        <AdminAnimeDetail url={'/api/admin/animes/' + this.props.params.animeId} />
      </div>
    )
  }
}
