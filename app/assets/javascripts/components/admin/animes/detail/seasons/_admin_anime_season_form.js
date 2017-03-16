import React, { Component, PropTypes } from 'react'
import MessageBox from './../../../../common/_message_box'

export default class AdminAnimeSeasonForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingForm: false,
      unsaved_start_on: '',
      unsaved_end_on: '',
      unsaved_phase: '',
      unsaved_name: '',
      message_type: 'danger',
      message: ''
    }
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleChangeStartOn = this.handleChangeStartOn.bind(this)
    this.handleChangeEndOn = this.handleChangeEndOn.bind(this)
    this.handleChangePhase = this.handleChangePhase.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.updateFailed = this.updateFailed.bind(this)
  }

  handleClickCancelButton() {
    this.props.onClose()
  }

  handleClickSubmitButton() {
    this.setState({loadingForm: true})
    this.props.onSubmit()
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

  updateFailed(message) {
    this.setState({
      loadingForm: false,
      message_type: 'danger',
      message: message
    })
    setTimeout(this.handleTimeout, 2000)
  }

  render() {
    return (
      <div className='adminAnimeSeasonFormComponent media'>
        <div className='media-body non-bordered'>
          <div className='form-horizontal'>
            <div className='col-sm-2'>
              <div className='form-group phase'>
                <span>{'第'}</span>
                <input className='form-control' defaultValue={(this.props.season || {}).phase} disabled={this.state.loadingForm} id='phase' name='phase' onChange={this.handleChangePhase} ref='phase' type='number' />
                <span>{'期'}</span>
              </div>
            </div>
            <div className='col-sm-10'>
              <div className='form-group name'>
                <input autoFocus className='form-control' defaultValue={(this.props.season || {}).name} disabled={this.state.loadingForm} id='name' name='name' onChange={this.handleChangeName} placeholder='シーズン名' ref='name' type='text' />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-sm-offset-2 col-sm-2'>
                <input className='form-control' defaultValue={(this.props.season || {}).start_on} disabled={this.state.loadingForm} id='start_on' name='start_on' onChange={this.handleChangeStartOn} ref='start_on' type='date' />
              </div>
              <div className='col-sm-1'>
                <span className='control-label'>{'〜'}</span>
              </div>
              <div className='col-sm-2'>
                <input className='form-control' defaultValue={(this.props.season || {}).end_on} disabled={this.state.loadingForm} id='end_on' name='end_on' onChange={this.handleChangeEndOn} ref='end_on' type='date' />
              </div>
            </div>
          </div>
          <a className='btn btn-danger animate-button' disabled={this.state.loadingForm} onClick={this.handleClickSubmitButton} type='submit'>
            {this.props.season ? (
              '更新'
            ) : (
              '登録'
            )}
          </a>
          <a className='btn btn-default cancel-button' disabled={this.state.loadingForm} onClick={this.handleClickCancelButton} type='submit'>
            {'キャンセル'}
          </a>
          <MessageBox message={this.state.message} message_type={this.state.message_type} />
        </div>
      </div>
    )
  }
}

AdminAnimeSeasonForm.propTypes = {
  season: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}
