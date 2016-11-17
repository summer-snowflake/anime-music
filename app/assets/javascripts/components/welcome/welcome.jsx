import React, { Component } from 'react'
import AnimeList from './anime_list.jsx'

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <AnimeList url='api/animes' />
      </div>
    );
  }
}
