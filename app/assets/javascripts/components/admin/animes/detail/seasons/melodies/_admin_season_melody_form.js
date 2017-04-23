import React, { Component, PropTypes } from 'react'
import MessageBox from './../../../../../common/_message_box'

export default class AdminSeasonMelodyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingForm: false,
      kind: 'OP',
      message_type: 'danger',
      message: '' 
    }
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleChangeKind = this.handleChangeKind.bind(this)
    this.updateFailed = this.updateFailed.bind(this)
  }

  handleClickSubmitButton(e) {
    e.preventDefault()
    this.props.onSubmit()
  }

  handleClickCancelButton() {
    this.props.onClose()
  }

  handleChangeKind(e) {
    this.setState({kind: e.target.getAttribute('value')})
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
      <div className='adminSeasonMelodyFormComponent'>
        <form className='form-inline' onSubmit={this.handleClickSubmitButton}>
          <div className='form-group kind'>
            <label className={'label ' + (this.state.kind == 'OP' ? 'label-info' : 'label-default')} onClick={this.handleChangeKind} value='OP'>
              {'OP'}
            </label>
            <label className={'label ' + (this.state.kind == 'ED' ? 'label-info' : 'label-default')} onClick={this.handleChangeKind} value='ED'>
              {'ED'}
            </label>
            <input type='hidden' ref='kind' value={this.state.kind} />
          </div>
          <div className='form-group title'>
            <label htmlFor='title'>
              <span className='glyphicon glyphicon-music' />
            </label>
            <input className='form-control' defaultValue={(this.props.melody || {}).title} disabled={this.state.loadingForm} id='title' placeholder='タイトル' ref='title' type='text' />
          </div>
          <div className='submit-button-field'>
            <a className='btn btn-danger animate-button' disabled={this.state.loadingForm} onClick={this.handleClickSubmitButton}>
              {this.props.melody ? (
                '更新'
              ) : ( 
                '登録'
              )}  
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

AdminSeasonMelodyForm.propTypes = {
  season_id: PropTypes.number.isRequired,
  melody: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}
