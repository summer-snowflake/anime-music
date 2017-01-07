import React, { Component, PropTypes } from 'react'
import Anime from './_anime.js'
import { origin } from './../../origin.js'

export default class AnimeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animes: []
    }
  }

  componentDidMount() {
    this.loadAnimesFromServer()
  }

  loadAnimesFromServer() {
    fetch(origin + this.props.url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({animes: res.animes})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='animeListComponent'>
        {this.state.animes.map((anime) =>
          <Anime anime={anime} key={anime.id} />
        )}
      </div>
    )
  }
}

AnimeList.propTypes = {
  url: PropTypes.string.isRequired
}
