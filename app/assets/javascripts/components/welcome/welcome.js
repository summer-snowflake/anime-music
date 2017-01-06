import React, { Component } from 'react'
import AnimeList from './_anime_list.js'

export default class Welcome extends Component {
  render() {
    return (
      <div className='welcomeComponent'>
        <AnimeList url='api/animes' />
      </div>
    )
  }
}
