import React, { Component } from 'react'
import AnimeList from './anime_list.js'

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <AnimeList url='api/animes' />
      </div>
    )
  }
}
