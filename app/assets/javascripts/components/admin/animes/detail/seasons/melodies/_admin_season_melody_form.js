import React, { Component, PropTypes } from 'react'
//import MessageBox from './../../../../../common/_message_box'

export default class AdminSeasonMelodyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingForm: false
    }
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
  }

  handleClickSubmitButton() {
    this.props.onClose()
  }

  handleClickCancelButton() {
    this.props.onSubmit()
  }

  render() {
    return (
      <div className='adminSeasonMelodyFormComponent'>
        <form className='form-inline'>
          <div className='form-group title'>
            <label htmlFor='title'>
              <span className='glyphicon glyphicon-music' />
            </label>
            <input className='form-control' defaultValue={(this.props.melody || {}).title} disabled={this.state.loadingForm} id='title' placeholder='タイトル' ref='title' type='text' />
          </div>
          <div className='submit-button-field'>
            <button className='btn btn-danger animate-button' disabled={this.state.loadingForm} onClick={this.handleClickSubmitButton} type='submit'>
              {this.props.melody ? ( 
                '更新'
              ) : ( 
                '登録'
              )}  
            </button>
            <a className='btn btn-default cancel-button' disabled={this.state.loadingForm} onClick={this.handleClickCancelButton} type='submit'>
              {'キャンセル'}
            </a>
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
