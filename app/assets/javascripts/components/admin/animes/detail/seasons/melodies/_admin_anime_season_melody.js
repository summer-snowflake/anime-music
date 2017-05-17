import React, { Component, PropTypes } from 'react'
import MovieModal from './_movie_modal'
import AdvertisementModal from './_advertisement_modal'

export default class AdminAnimeSeasonMelody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMovieModal: false,
      showAdvertisementModal: false
    }
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickMovieModalIcon = this.handleClickMovieModalIcon.bind(this)
    this.handleClickAdvertisementModalIcon = this.handleClickAdvertisementModalIcon.bind(this)
    this.handleClickCloseButton = this.handleClickCloseButton.bind(this)
  }

  handleClickEditIcon() {
    this.props.onShowEditMelodyField(this.props.melody.id)
  }

  handleClickMovieModalIcon() {
    this.setState({showMovieModal: true})
  }

  handleClickAdvertisementModalIcon() {
    this.setState({showAdvertisementModal: true})
  }

  handleClickCloseButton() {
    this.setState({showMovieModal: false, showAdvertisementModal: false})
  }

  render() {
    return (
      <div className='adminAnimeSeasonMelodyComponent' id={'melody-' + this.props.melody.id}>
        <div className='label label-info kind-label'>
          {this.props.melody.kind.toUpperCase()}
        </div>
        <div className='label pull-right'>
          <span className='link' onClick={this.handleClickEditIcon}>
            <span className='glyphicon glyphicon-pencil' />
          </span>
        </div>
        {this.props.melody.youtube ? (
          <div className='youtube pull-right'>
            <span className='label label-danger link' onClick={this.handleClickMovieModalIcon}>
              <span className='glyphicon glyphicon-modal-window' />
            </span>
            <MovieModal onClickCloseButton={this.handleClickCloseButton} showModal={this.state.showMovieModal} youtube={this.props.melody.youtube} />
          </div>
        ) : (
          null
        )}
        {this.props.melody.advertisement_body ? (
          <div className='youtube pull-right'>
            <span className='label label-warning link' onClick={this.handleClickAdvertisementModalIcon}>
              <span className='glyphicon glyphicon-modal-window' />
            </span>
            <AdvertisementModal body={this.props.melody.advertisement_body} onClickCloseButton={this.handleClickCloseButton} showModal={this.state.showAdvertisementModal} />
          </div>
        ) : (
          null
        )}
        <div className='title'>
          <span className='glyphicon glyphicon-music' />
          {this.props.melody.title}
        </div>
        <span>
          {'歌: ' + (this.props.melody.singer_name || '')}
        </span>
      </div>
    )
  }
}

AdminAnimeSeasonMelody.propTypes = {
  melody: PropTypes.object.isRequired,
  onShowEditMelodyField: PropTypes.func.isRequired
}
