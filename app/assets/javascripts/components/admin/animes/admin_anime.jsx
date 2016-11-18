import React, { Component } from 'react'

export default class AdminAnime extends Component {
  render() {
    return (
      <div>
        Admin Anime # {this.props.params.animeId}
      </div>
    )
  }
}
