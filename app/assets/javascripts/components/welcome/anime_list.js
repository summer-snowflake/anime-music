import React, { Component, PropTypes } from 'react'
import Anime from './anime.js'
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
    $.ajax({
      url: origin + this.props.url,
      dataType: 'json',
      success: (res) => {
        this.setState({animes: res.animes})
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString())
      }
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
