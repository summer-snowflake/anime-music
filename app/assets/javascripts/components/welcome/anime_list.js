import React, { Component, PropTypes } from 'react'
import Anime from './anime.js'
import { domain } from './../../domain.js'
import fetch from 'isomorphic-fetch'

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
    fetch(domain + this.props.url)
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
      <div className='anime-list'>
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
