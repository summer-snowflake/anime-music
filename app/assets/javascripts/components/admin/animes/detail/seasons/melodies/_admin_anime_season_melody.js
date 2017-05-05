import React, { Component, PropTypes } from 'react'
import MovieModal from './_movie_modal'

export default class AdminAnimeSeasonMelody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickModalIcon = this.handleClickModalIcon.bind(this)
    this.handleClickCloseButton = this.handleClickCloseButton.bind(this)
  }

  handleClickEditIcon() {
    this.props.onShowEditMelodyField(this.props.melody.id)
  }

  handleClickModalIcon() {
    this.setState({showModal: true})
  }

  handleClickCloseButton() {
    this.setState({showModal: false})
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
            <span className='label label-danger link' onClick={this.handleClickModalIcon}>
              <span className='glyphicon glyphicon-modal-window' />
            </span>
            <MovieModal showModal={this.state.showModal} handleClickCloseButton={this.handleClickCloseButton} youtube={this.props.melody.youtube} />
          </div>
        ) : (
          null
        )}
        <div className='title'>
          <span className='glyphicon glyphicon-music' />
          {this.props.melody.title}
        </div>
      </div>
    )
  }
}

AdminAnimeSeasonMelody.propTypes = {
  melody: PropTypes.object.isRequired,
  onShowEditMelodyField: PropTypes.func.isRequired
}
