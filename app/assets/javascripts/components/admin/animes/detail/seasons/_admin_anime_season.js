import React, { Component, PropTypes } from 'react'
import AdminAnimeSeasonForm from './_admin_anime_season_form'

export default class AdminAnimeSeason extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false
    }
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
  }

  handleClickEditIcon() {
    this.setState({showForm: true})
  }

  handleClickSubmitButton() {
    this.setState({showForm: false})
  }

  handleClickCancelButton() {
    this.setState({showForm: false})
  }

  loadSeasonFromServer() {
  }
 
  render() {
    let editing_jsx = (
      <div className='editing-body'>
        <AdminAnimeSeasonForm anime_id={this.props.season.anime_id} onClose={this.handleClickCancelButton} onSubmit={this.handleClickSubmitButton} />
      </div>
    )

    let not_editing_jsx = (
      <div className='media-body not-editing-body'>
        <div className='media-heading'>
          {'第' + this.props.season.phase + '期：'}
          {this.props.season.name}
        </div>
        <div className='period'>
          {this.props.season.period}
        </div>
        <div className='pull-right'>
          <span className='link' onClick={this.handleClickEditIcon}>
            <span className='glyphicon glyphicon-pencil' />
          </span>
        </div>
      </div>
    )

    return (
      <div className='adminAnimeSeasonComponent media'>
        {(() => {
          if (this.state.showForm)
            return editing_jsx
          else
            return not_editing_jsx
        })()}
      </div>
    )
  }
}

AdminAnimeSeason.propTypes = {
  season: PropTypes.object.isRequired
}
