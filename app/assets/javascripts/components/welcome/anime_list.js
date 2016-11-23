import React, { Component } from 'react'
import Anime from './anime.js'

export default class AnimeList extends Component {
  loadAnimesFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: (res) => {
        this.setState({animes: res.animes})
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString())
      }
    })
  }

  componentWillMount() {
    this.loadAnimesFromServer()
  }

  constructor(props) {
    super(props)
    this.state = {
      animes: []
    }
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
