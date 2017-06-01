import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { origin } from './../../../../origin.js'

import AdminAnimeTitle from './_admin_anime_title'
import AdminAnimeThumbnail from './_admin_anime_thumbnail'
import AdminAnimeBody from './_admin_anime_body'
import AdminAnimeAdvertisements from './advertisements/_admin_anime_advertisements'

export default class AdminAnimeDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime: {id: 0, title: '', summary: '', wiki_url: '', picture: '', airing: false}
    }
    this.loadAnimeFromServer = this.loadAnimeFromServer.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onUpload = this.onUpload.bind(this)
  }

  componentDidMount() {
    this.loadAnimeFromServer()
  }

  onSubmit(params) {
    this.updateAnimeAgainstServer(params)
  }

  onUpload(params) {
    this.uploadImageAgainstServer(params)
  }

  loadAnimeFromServer() {
    fetch(origin + 'api/admin/animes/' + this.props.anime_id, {
      headers: {'Authorization': 'Token token=' + localStorage.getItem('access_token')}
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({anime: res})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  uploadImageAgainstServer(params) {
    fetch(origin + 'api/admin/animes/' + this.props.anime_id, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Token token=' + localStorage.getItem('access_token')
      },
      body: params
    })
      .then((res) => {
        if(res.status == '200') {
          this.refs.thumbnail.uploadSuccess()
          this.loadAnimeFromServer()
        } else {
          res.json().then((json) => {
            this.refs.thumbnail.uploadFailed(json.error_messages[0])
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }


  updateAnimeAgainstServer(params) {
    fetch(origin + 'api/admin/animes/' + this.props.anime_id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + localStorage.getItem('access_token')
      },
      body: JSON.stringify(params)
    })
      .then((res) => {
        if(res.status == '200') {
          this.loadAnimeFromServer()
          if(params.title) {
            this.refs.title.updateSuccess()
          }
          if(params.summary) {
            this.refs.body.updateSuccess()
          }
        } else {
          this.setState({editingTitle: true, title: ''})
          res.json().then((json) => {
            if(params.title != undefined) {
              this.refs.title.updateFailed(json.error_messages[0])
            }
            if(params.summary != undefined) {
              this.refs.body.updateFailed(json.error_messages[0])
            }
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className='adminAnimeDetailComponent'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <AdminAnimeTitle airing={this.state.anime.airing} handleUpdateTitle={this.onSubmit} ref='title' title={this.state.anime.title} />
            <div className="row">
              <div className="col-xs-6 col-md-3">
                <AdminAnimeThumbnail handleUpdateThumbnail={this.onUpload} picture={this.state.anime.picture} ref='thumbnail' title={this.state.anime.title} />
              </div>
              <div className="col-xs-6 col-md-9">
                <AdminAnimeBody handleUpdateBody={this.onSubmit} ref='body' summary={this.state.anime.summary} wiki_url={this.state.anime.wiki_url} />
              </div>
            </div>
            <hr />
            <AdminAnimeAdvertisements anime_id={this.props.anime_id} />
          </div>
        </div>
      </div>
    )
  }
}

AdminAnimeDetail.propTypes = {
  anime_id: PropTypes.string.isRequired
}
