import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../../origin.js'
import MessageBox from './../../../../common/_message_box'
import AdminNewButtonField from './../../../_admin_new_button_field'

export default class AdminAnimeSeasonNewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      loadingForm: false,
      unsaved_start_on: '',
      unsaved_end_on: '',
      unsaved_phase: '',
      unsaved_name: '',
      message_type: 'success',
      message: ''
    }
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleChangeStartOn = this.handleChangeStartOn.bind(this)
    this.handleChangeEndOn = this.handleChangeEndOn.bind(this)
    this.handleChangePhase = this.handleChangePhase.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.handleShowNewForm = this.handleShowNewForm.bind(this)
  }

  handleShowNewForm() {
    this.setState({showForm: true})
  }

  handleClickCancelButton() {
    this.setState({showForm: false})
  }

  handleClickSubmitButton() {
    this.setState({loadingForm: true})
    this.postAnimeSeasonAgainstServer()
  }

  handleChangeStartOn(e) {
    this.setState({unsaved_start_on: e.target.value})
  }

  handleChangeEndOn(e) {
    this.setState({unsaved_end_on: e.target.value})
  }

  handleChangePhase(e) {
    this.setState({unsaved_phase: e.target.value})
  }

  handleChangeName(e) {
    this.setState({unsaved_name: e.target.value})
  }

  handleTimeout() {
    this.setState({message: ''})
  }

  postAnimeSeasonAgainstServer() {
    const params = { season: {
      start_on: this.state.unsaved_start_on,
      end_on: this.state.unsaved_end_on,
      phase: this.state.unsaved_phase,
      name: this.state.unsaved_name
    }}
    fetch(origin + 'api/admin/animes/' + this.props.anime_id + '/seasons', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
      .then((res) => {
        if(res.status == '201') {
          this.setState({
            showForm: false,
            loadingForm: false,
            unsaved_start_on: '',
            unsaved_end_on: '',
            unsaved_phase: '',
            unsaved_name: '',
            message_type: 'success',
            message: '「' + this.state.unsaved_name + '」を登録しました'
          })
          this.props.handleLoadSeasons()
          setTimeout(this.handleTimeout, 2000)
        } else {
          res.json().then((json) => {
            this.setState({
              loadingForm: false,
              message_type: 'danger',
              message: json.error_messages[0]
            })
            setTimeout(this.handleTimeout, 2000)
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className='adminAnimeSeasonNewFormComponent new-form-field'>
        {this.state.showForm ? (
          <div className='media'>
            <div className='media-body non-bordered'>
              <div className='form-horizontal'>
                <div className='form-group'>
                  <div className='col-sm-2'>
                    <input className='form-control' disabled={this.state.loadingForm} id='start_on' name='start_on' onChange={this.handleChangeStartOn} type='date' />
                  </div>
                  <div className='col-sm-1'>
                    <span className='control-label'>{'〜'}</span>
                  </div>
                  <div className='col-sm-2'>
                    <input className='form-control' disabled={this.state.loadingForm} id='end_on' name='end_on' onChange={this.handleChangeEndOn} type='date' />
                  </div>
                </div>
                <div className='col-sm-2'>
                  <div className='form-group phase'>
                    <span>{'第'}</span>
                    <input className='form-control' disabled={this.state.loadingForm} id='phase' name='phase' onChange={this.handleChangePhase} type='number' />
                    <span>{'期'}</span>
                  </div>
                </div>
                <div className='col-sm-10'>
                  <div className='form-group name'>
                    <input autoFocus className='form-control' disabled={this.state.loadingForm} id='name' name='name' onChange={this.handleChangeName} type='text' />
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <a className='btn btn-danger animate-button' disabled={this.state.loadingForm} onClick={this.handleClickSubmitButton} type='submit'>
                  {'登録'}
                </a>
                <a className='btn btn-default cancel-button' disabled={this.state.loadingForm} onClick={this.handleClickCancelButton} type='submit'>
                  {'キャンセル'}
                </a>
              </div>
              <MessageBox message={this.state.message} message_type={this.state.message_type} />
            </div>
          </div>
          ) : (
          <AdminNewButtonField message={this.state.message} message_type={this.state.message_type} onLoadNewForm={this.handleShowNewForm} />
          )}
      </div>
    )
  }
}

AdminAnimeSeasonNewForm.propTypes = {
  anime_id: PropTypes.string.isRequired,
  handleLoadSeasons: PropTypes.func.isRequired
}
