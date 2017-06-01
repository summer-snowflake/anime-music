import PropTypes from 'prop-types'
import React, { Component } from 'react'
import AdminSeasonMelodyForm from './_admin_season_melody_form'
import DestroyModal from './../../../../../common/_destroy_modal'
import { origin } from './../../../../../../origin.js'

export default class AdminSeasonMelodyEditField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      message_type: 'success',
      message: ''
    }
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this)
    this.handleUploadImages = this.handleUploadImages.bind(this)
    this.onClickDeleteCancelButton = this.onClickDeleteCancelButton.bind(this)
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this)
  }

  handleClickTrashIcon() {
    this.setState({showModal: true}) 
  }

  onClickDeleteCancelButton() {
    this.setState({showModal: false}) 
  }

  handleClickCancelButton() {
    this.props.onCloseEditMelodyField(this.props.melody.id)
  }

  handleClickSubmitButton(params) {
    this.postAnimeSeasonMelodyAgainsServer(params)
  }

  handleUploadImages(params) {
    this.uploadImagesAgainstServer(params)
  }

  uploadImagesAgainstServer(params) {
    fetch(origin + 'api/admin/melodies/' + this.props.melody.id + '/melody_images', {
      method: 'POST',
      headers: {
        'Authorization': 'Token token=' + localStorage.getItem('access_token')
      },
      body: params
    })
      .then((res) => {
        if(res.status == '201') {
          // this.refs.thumbnail.uploadSuccess()
          // TODO: アップロード成功のメッセージ
          this.props.handleLoadMelodyImages(this.props.melody.id)
        } else {
          console.log('error')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  loadMelodyImagesFromServer() {
    fetch(origin + 'api/admin/melodies/' + this.props.melody.id + '/melody_images', {
      headers: {'Authorization': 'Token token=' + localStorage.getItem('access_token')}
    })
      .then((res) => res.json())
      .then(() => {
        this.props.handleLoadMelodyImages()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  onClickDeleteButton() {
    fetch(origin + 'api/admin/seasons/' + this.props.melody.season_id + '/melodies/' + this.props.melody.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + localStorage.getItem('access_token')
      }
    })
      .then((res) => {
        if(res.status == '200') {
          this.setState({showModal: false})
          this.props.handleLoadMelodies()
        } else {
          alert('削除できませんでした')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  postAnimeSeasonMelodyAgainsServer(params) {
    fetch(origin + 'api/admin/seasons/' + this.props.melody.season_id + '/melodies/' + this.props.melody.id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + localStorage.getItem('access_token')
      },  
      body: JSON.stringify(params)
    })  
      .then((res) => {
        if(res.status == '200') {
          this.props.handleLoadMelodies()
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

  render() {
    return (
      <div>
        {this.props.melody.showEditForm ? (
          <div className='adminSeasonMelodyEditFieldComponent new-form-field media-body non-bordered'>
            <AdminSeasonMelodyForm melody={this.props.melody} onClose={this.handleClickCancelButton} onLoadImages={this.props.handleLoadMelodyImages} onSubmit={this.handleClickSubmitButton} onUpload={this.handleUploadImages} ref='form' season_id={this.props.melody.season_id} />
            <div className='pull-right'>
              <span className='link' onClick={this.handleClickTrashIcon}>
                <span className='glyphicon glyphicon-trash' />
              </span>
            </div>
            <DestroyModal handleCancel={this.onClickDeleteCancelButton} handleDestroy={this.onClickDeleteButton} showModal={this.state.showModal} />
          </div>
          ) : (
            null
          )}
      </div>
    )
  }
}

AdminSeasonMelodyEditField.propTypes = {
  melody: PropTypes.object.isRequired,
  handleLoadMelodies: PropTypes.func.isRequired,
  handleLoadMelodyImages: PropTypes.func.isRequired,
  onCloseEditMelodyField: PropTypes.func.isRequired
}
