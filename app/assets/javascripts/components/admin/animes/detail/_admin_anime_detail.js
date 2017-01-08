import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../origin.js'

import AdminAnimeTitle from './_admin_anime_title'
import AdminAnimeThumbnail from './_admin_anime_thumbnail'

export default class AdminAnimeDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime: {id: 0, title: '', summary: '', wiki_url: '', picture: ''}
    }
  }

  componentDidMount() {
    this.loadAnimesFromServer()
  }

  loadAnimesFromServer() {
    fetch(origin + this.props.url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({anime: res})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='adminAnimeDetailComponent'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <AdminAnimeTitle id={this.state.anime.id} title={this.state.anime.title} />
            <AdminAnimeThumbnail id={this.state.anime.id} picture={this.state.anime.picture} title={this.state.anime.title} />
            {this.state.anime.summary}
          </div>
        </div>
      </div>
    )
  }
}

AdminAnimeDetail.propTypes = {
  url: PropTypes.string.isRequired
}
