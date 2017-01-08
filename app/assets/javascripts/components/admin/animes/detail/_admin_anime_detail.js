import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../origin.js'

import AdminAnimeTitle from './_admin_anime_title'
import AdminAnimeThumbnail from './_admin_anime_thumbnail'
import AdminAnimeSeasons from './_admin_anime_seasons'

export default class AdminAnimeDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime: {id: 0, title: '', summary: '', wiki_url: '', picture: '', seasons: []}
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
            <div className="row">
              <div className="col-xs-6 col-md-3">
                <AdminAnimeThumbnail id={this.state.anime.id} picture={this.state.anime.picture} title={this.state.anime.title} />
              </div>
              <div className="col-xs-6 col-md-9">
                {this.state.anime.summary}
              </div>
            </div>
            <AdminAnimeSeasons seasons={this.state.anime.seasons} />
          </div>
        </div>
      </div>
    )
  }
}

AdminAnimeDetail.propTypes = {
  url: PropTypes.string.isRequired
}
