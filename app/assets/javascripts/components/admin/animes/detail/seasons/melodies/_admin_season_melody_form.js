import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MessageBox from './../../../../../common/_message_box'
import AdminMelodyImage from './_admin_melody_image'
import SelectKind from './_select_kind'
import { origin } from './../../../../../../origin.js'

export default class AdminSeasonMelodyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingForm: false,
      kind: ((this.props.melody || {}).kind || 'op').toUpperCase(),
      unsaved_draft: (this.props.melody || {}).draft || false,
      message_type: 'danger',
      message: '' 
    }
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickUploadIcon = this.handleClickUploadIcon.bind(this)
    this.handleChangeKind = this.handleChangeKind.bind(this)
    this.handleChangeDraft = this.handleChangeDraft.bind(this)
    this.handleChangeFile = this.handleChangeFile.bind(this)
    this.onDeleteMelodyImage = this.onDeleteMelodyImage.bind(this)
    this.updateFailed = this.updateFailed.bind(this)
    this.uploadFiles = this.uploadFiles.bind(this)
  }

  handleClickUploadIcon() {
    this.refs.file.click()
  }

  handleChangeFile(e) {
    if(e.target.files[0] != undefined) {
      let formData = new FormData()
      for (let i=0; e.target.files[i]; ++i) {
        formData.append('picture[]', e.target.files[i])
      }
      this.uploadFiles(formData)
    }
  }

  uploadFiles(files) {
    this.props.onUpload(files)
  }

  handleClickSubmitButton(e) {
    e.preventDefault()
    const params = {
      melody: {
        draft: this.refs.draft.checked,
        kind: this.refs.select_kind.refs.kind.value.toLowerCase(),
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

  handleChangeDraft() {
    this.setState({unsaved_draft: !this.state.unsaved_draft})
  }

  onDeleteMelodyImage(melody_image_id) {
    fetch(origin + 'api/admin/melodies/' + this.props.melody.id + '/melody_images/' + melody_image_id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + localStorage.getItem('access_token')
      }
    })
      .then((res) => {
        if(res.status == '200') {
          this.props.onLoadImages(this.props.melody.id)
        } else {
          alert('削除できませんでした')
        }
      })
      .catch((error) => {
        console.log(error)
      })
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
            <SelectKind kind={this.state.kind} onChangeKind={this.handleChangeKind} ref='select_kind' />
          </div>
          {this.props.melody ? (
            <div className='form-group melody-image'>
              {this.props.melody.melody_images.length > 0 ? (
                <div className='image-field'>
                  {this.props.melody.melody_images.map((melody_image) =>
                    <AdminMelodyImage handleDeleteMelodyImage={this.onDeleteMelodyImage} key={melody_image.id} melody_image={melody_image} />
                  )}
                </div>
              ) : (
                <div className='no-image img-thumbnail'>
                  <span>{'NO IMAGE'}</span>
                </div>
              )}
              <div className='clear upload-trigger-field'>
                <a className='btn btn-primary' onClick={this.handleClickUploadIcon}>{'Add Picture'}</a>
                <input className='upload-file' multiple='multiple' onChange={this.handleChangeFile} ref='file' type='file' />
              </div>
            </div>
          ) : (
            null
          )}
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
          <div className='form-group draft checkbox'>
            <label>
              <input checked={this.state.unsaved_draft} defaultValue={this.state.unsaved_draft} name='draft' onChange={this.handleChangeDraft} ref='draft' type='checkbox' />
              {'下書きとして保存'}
            </label>
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
  onSubmit: PropTypes.func.isRequired,
  onUpload: PropTypes.func,
  onLoadImages: PropTypes.func
}
