import React, { Component, PropTypes } from 'react'
import MessageBox from './../../../../common/_message_box'

export default class AdminAdvertisementForm extends Component {
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
    const body = this.refs.body.value
    this.props.onSubmit(body)
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
      <div className='adminAdvertisementFormComponent'>
        <form className='form-inline' onSubmit={this.handleClickSubmitButton}>
          <div className='form-group body'>
            <textarea className='form-control' defaultValue={(this.props.advertisement || {}).body} disabled={this.state.loadingForm} id='body' placeholder='htmlタグ' ref='body' rows='4' cols='120' />
          </div>
          <div className='submit-button-field'>
            <a className='btn btn-danger animate-button' disabled={this.state.loadingForm} onClick={this.handleClickSubmitButton}>
              {this.props.melody ? '更新' : '登録'}
            </a>
            <a className='btn btn-default cancel-button' disabled={this.state.loadingForm} onClick={this.handleClickCancelButton}>
              {'キャンセル'}
            </a>
            <MessageBox message={this.state.message} message_type={this.state.message_type} />
          </div>
        </form>
      </div>
    )
  }
}

AdminAdvertisementForm.propTypes = {
  advertisement: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}
