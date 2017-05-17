import React, { Component, PropTypes } from 'react'
import MessageBox from './../../../../../common/_message_box'

export default class AdminSeasonMelodyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingForm: false,
      kind: ((this.props.melody || {}).kind || 'op').toUpperCase(),
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
    const params = {
      melody: {
        kind: this.refs.kind.value.toLowerCase(),
        title: this.refs.title.value,
        singer_name: this.refs.singer_name.value,
        lyric_writer: this.refs.lyric_writer.value,
        composer: this.refs.composer.value,
        adapter: this.refs.adapter.value,
        memo: this.refs.memo.value,
        youtube: this.refs.youtube.value,
        advertisement_attributes: {
          id: (this.props.melody || {}).advertisement_id,
          body: this.refs.body.value
        }
      },
    }
    this.props.onSubmit(params)
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
            <input ref='kind' type='hidden' value={this.state.kind} />
          </div>
          <div className='form-group title'>
            <label htmlFor='title'>
              <span className='glyphicon glyphicon-music' />
            </label>
            <input className='form-control' defaultValue={(this.props.melody || {}).title} disabled={this.state.loadingForm} id='title' placeholder='タイトル' ref='title' type='text' />
          </div>
          <div className='form-group singer'>
            <label htmlFor='singer_name'>
              <span className='glyphicon glyphicon-user' />
            </label>
            <input className='form-control' defaultValue={(this.props.melody || {}).singer_name} disabled={this.state.loadingForm} id='singer_name' placeholder='歌' ref='singer_name' type='text' />
          </div>
          <div className='clear'>
            <div className='form-group lyric_writer'>
              <input className='form-control' defaultValue={(this.props.melody || {}).lyric_writer} disabled={this.state.loadingForm} id='lyric_writer' placeholder='作詞' ref='lyric_writer' type='text' />
            </div>
            <div className='form-group composer'>
              <input className='form-control' defaultValue={(this.props.melody || {}).composer} disabled={this.state.loadingForm} id='composer' placeholder='作曲' ref='composer' type='text' />
            </div>
            <div className='form-group adapter'>
              <input className='form-control' defaultValue={(this.props.melody || {}).adapter} disabled={this.state.loadingForm} id='adapter' placeholder='編曲' ref='adapter' type='text' />
            </div>
          </div>
          <div className='form-group memo'>
            <textarea className='form-control' cols='80' defaultValue={(this.props.melody || {}).memo} disabled={this.state.loadingForm} id='memo' placeholder='メモ・備考' ref='memo' rows='3' />
          </div>
          <div className='form-group youtube'>
            <textarea className='form-control' cols='80' defaultValue={(this.props.melody || {}).youtube} disabled={this.state.loadingForm} id='youtube' placeholder='Youtubeの埋め込みコード' ref='youtube' rows='4' />
          </div>
          <div className='form-group body'>
            <textarea className='form-control' cols='80' defaultValue={(this.props.melody || {}).advertisement_body} disabled={this.state.loadingForm} id='body' placeholder='htmlタグ' ref='body' rows='4' />
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

AdminSeasonMelodyForm.propTypes = {
  season_id: PropTypes.number.isRequired,
  melody: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}
