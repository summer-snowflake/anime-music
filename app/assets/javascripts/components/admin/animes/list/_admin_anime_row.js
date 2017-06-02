import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router'
import { origin } from './../../../../origin.js'
import DestroyModal from './../../../common/_destroy_modal'

export default class AdminAnimeRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.onClickCancelButton = this.onClickCancelButton.bind(this)
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this)
  }

  handleClickTrashIcon() {
    this.setState({showModal: true})
  }

  onClickCancelButton() {
    this.setState({showModal: false})
  }

  onClickDeleteButton() {
    fetch(origin + 'api/admin/animes/' + this.props.anime.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + localStorage.getItem('access_token')
      }
    })
      .then((res) => {
        if(res.status == '200') {
          this.setState({showModal: false})
          this.props.handleLoad()
        } else {
          alert('削除できませんでした')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className='media adminAnimeRowComponent' id={'anime-' + this.props.anime.id}>
        <div className='media-left'>
          <Link className='link' to={'/admin/animes/' + this.props.anime.id}>
            {this.props.anime.picture ? (
              <img alt={this.props.anime.title} className='media-object' src={this.props.anime.picture} />
            ) : (
              <span className='media-object no-image'>
                <span>{'NO IMAGE'}</span>
                <span className='glyphicon glyphicon-picture' />
              </span>
            )}
          </Link>
        </div>
        <div className='media-body'>
          <h4 className='media-heading'>
            <Link to={'/admin/animes/' + this.props.anime.id}>
              {this.props.anime.title}
            </Link>
            {this.props.anime.airing ? (
              <span className='pull-right label label-default'>{'放送中'}</span>
            ) : (
              null
            )}
          </h4>
          <div className='seasons'>
            {this.props.anime.seasons.map((season) => (
              <div className='season' key={season.id}>
                <p>{season.anime_title}</p>
                <div className='btn-group' id='melodies'>
                  {season.melodies.map((melody) => (
                    <button className={'btn btn-default' + (melody.draft ? ' is-draft' : '')} key={melody.id} type='button'>
                      <label className='label label-info link'>{melody.kind}</label>
                      {melody.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className='wiki-url'>
            <a href={this.props.anime.wiki_url} target='_blank'>{this.props.anime.wiki_url}</a>
          </div>
        </div>
        <div className='media-right'>
          <div className='pull-right'>
            <span className='glyphicon glyphicon-trash link' onClick={this.handleClickTrashIcon} />
          </div>
        </div>
        <DestroyModal handleCancel={this.onClickCancelButton} handleDestroy={this.onClickDeleteButton} showModal={this.state.showModal} />
      </div>
    )
  }
}

AdminAnimeRow.propTypes = {
  anime: PropTypes.object.isRequired,
  handleLoad: PropTypes.func.isRequired
}
