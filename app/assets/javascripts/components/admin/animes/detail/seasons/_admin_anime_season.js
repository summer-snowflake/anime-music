import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../../origin.js'
import AdminAnimeSeasonForm from './_admin_anime_season_form'
import MessageBox from './../../../../common/_message_box'
import DestroyModal from './../../../../common/_destroy_modal'

export default class AdminAnimeSeason extends Component {
  constructor(props) {
    super(props)
    this.state = {
      season: this.props.season,
      showForm: false,
      showModal: false,
      message_type: 'success',
      message: ''
    }
    this.handleClickEditIcon = this.handleClickEditIcon.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.onClickCancelButton = this.onClickCancelButton.bind(this)
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.updateAnimeSeasonAgainstServer = this.updateAnimeSeasonAgainstServer.bind(this)
    this.loadAnimeSeasonFromServer = this.loadAnimeSeasonFromServer.bind(this)
  }

  handleClickEditIcon() {
    this.setState({showForm: true})
  }

  handleClickTrashIcon() {
    this.setState({showModal: true}) 
  }

  handleTimeout() {
    this.setState({message: ''})
  }

  handleClickSubmitButton() {
    let params = {
      season: {
        phase: this.refs.form.refs.phase.value,
        name: this.refs.form.refs.name.value,
        start_on: this.refs.form.refs.start_on.value,
        end_on: this.refs.form.refs.end_on.value
      }
    }
    this.updateAnimeSeasonAgainstServer(params)
  }

  handleClickCancelButton() {
    this.setState({showForm: false})
  }

  onClickCancelButton() {
    this.setState({showModal: false})
  }

  onClickDeleteButton() {
    fetch(origin + 'api/admin/animes/' + this.props.season.anime_id + '/seasons/' + this.props.season.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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

  updateAnimeSeasonAgainstServer(params) {
    fetch(origin + 'api/admin/animes/' + this.props.season.anime_id + '/seasons/' + this.props.season.id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
      .then((res) => {
        if(res.status == '200') {
          this.setState({showForm: false, message_type: 'success', message: '更新しました'})
          setTimeout(this.handleTimeout, 2000)
          this.loadAnimeSeasonFromServer()
        } else {
          res.json().then((json) => {
            this.refs.form.updateFailed(json.error_messages[0])
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  loadAnimeSeasonFromServer() {
    fetch(origin + 'api/admin/animes/' + this.props.season.anime_id + '/seasons/' + this.props.season.id)
      .then((res) => res.json())
      .then((res) => {
        this.setState({season: res})
      })
      .catch((error) => {
        console.error(error)
      })
  }
 
  render() {
    let editing_jsx = (
      <div className='media-body editing-body edit-form-field'>
        <AdminAnimeSeasonForm anime_id={this.props.season.anime_id} onClose={this.handleClickCancelButton} onSubmit={this.handleClickSubmitButton} ref='form' season={this.state.season} />
        <div className='pull-right'>
          <span className='link' onClick={this.handleClickTrashIcon}>
            <span className='glyphicon glyphicon-trash' />
          </span>
        </div>
      </div>
    )

    let not_editing_jsx = (
      <div className='media-body not-editing-body'>
        <div className='media-heading'>
          {'第' + this.state.season.phase + '期：'}
          {this.state.season.name}
        </div>
        <div className='period'>
          {this.state.season.period}
        </div>
        <div className='pull-right'>
          <span className='link' onClick={this.handleClickEditIcon}>
            <span className='glyphicon glyphicon-pencil' />
          </span>
        </div>
        <MessageBox message={this.state.message} message_type={this.state.message_type} />
      </div>
    )

    return (
      <div className='adminAnimeSeasonComponent media' id={'season-' + this.state.season.id}>
        {(() => {
          if (this.state.showForm)
            return editing_jsx
          else
            return not_editing_jsx
        })()}
        <DestroyModal handleCancel={this.onClickCancelButton} handleDestroy={this.onClickDeleteButton} showModal={this.state.showModal} />
      </div>
    )
  }
}

AdminAnimeSeason.propTypes = {
  season: PropTypes.object.isRequired,
  handleLoad: PropTypes.func.isRequired
}
