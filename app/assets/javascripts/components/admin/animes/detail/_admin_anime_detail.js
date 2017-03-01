import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../origin.js'

import AdminAnimeTitle from './_admin_anime_title'
import AdminAnimeThumbnail from './_admin_anime_thumbnail'
import AdminAnimeBody from './_admin_anime_body'

export default class AdminAnimeDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime: {id: 0, title: '', summary: '', wiki_url: '', picture: ''}
    }
    this.loadAnimeFromServer = this.loadAnimeFromServer.bind(this)
  }

  componentDidMount() {
    this.loadAnimeFromServer()
  }

  loadAnimeFromServer() {
    fetch(origin + 'api/admin/animes/' + this.props.anime_id)
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
            <div className="row">
              <div className="col-xs-6 col-md-3">
                <AdminAnimeThumbnail id={this.state.anime.id} picture={this.state.anime.picture || ''} title={this.state.anime.title} />
              </div>
              <div className="col-xs-6 col-md-9">
                <AdminAnimeBody id={this.state.anime.id} onLoadAnime={this.loadAnimeFromServer} summary={this.state.anime.summary} wiki_url={this.state.anime.wiki_url} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AdminAnimeDetail.propTypes = {
  anime_id: PropTypes.string.isRequired
}
