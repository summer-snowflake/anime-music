import PropTypes from 'prop-types'
import React, { Component } from 'react'
import MessageBox from './../../../common/_message_box'
import DestroyModal from './../../../common/_destroy_modal'

export default class AdminAnimeThumbnail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message_type: 'success',
      message: '',
      showModal: false
    }
    this.handleClickUploadIcon = this.handleClickUploadIcon.bind(this)
    this.handleClickTrashIcon = this.handleClickTrashIcon.bind(this)
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this)
    this.onClickCancelButton = this.onClickCancelButton.bind(this)
    this.handleChangeFile = this.handleChangeFile.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.uploadSuccess = this.uploadSuccess.bind(this)
    this.uploadFailed = this.uploadFailed.bind(this)
  }

  onClickDeleteButton() {
    this.props.handleDeleteThumbnail()
  }

  onClickCancelButton() {
    this.setState({showModal: false})
  }

  handleTimeout() {
    this.setState({message: ''})
  }

  handleClickUploadIcon() {
    this.refs.file.click()
  }

  handleClickTrashIcon() {
    this.setState({showModal: true}) 
  }

  handleChangeFile(e) {
    if(e.target.files[0] != undefined) {
      let formData = new FormData()
      formData.append('picture', e.target.files[0])
      this.uploadFile(formData)
    }
  }

  uploadFile(file) {
    this.props.handleUpdateThumbnail(file)
  }

  uploadSuccess() {
    this.setState({
      message_type: 'success',
      message: 'アップロードしました',
      showModal: false
    })
    setTimeout(this.handleTimeout, 2000)
  }

  uploadFailed(message) {
    this.setState({
      message_type: 'danger',
      message: message
    })
    setTimeout(this.handleTimeout, 2000)
  }

  render() {
    return (
      <div className='adminAnimeThumbnailComponent'>
        <MessageBox message={this.state.message} message_type={this.state.message_type} />
        <div className='col-xs-6 col-md-3'>
          <span className='thumbnail'>
            {this.props.picture ? (
              <span>
                <span className='link glyphicon glyphicon-trash' onClick={this.handleClickTrashIcon} />
                <DestroyModal handleCancel={this.onClickCancelButton} handleDestroy={this.onClickDeleteButton} showModal={this.state.showModal} />
              </span>
            ) : (
              null
            )}
            {this.props.picture ? (
              <img alt={this.props.title} src={this.props.picture} />
            ) : (
              <div className='no-image'>
                <span>{'NO IMAGE'}</span>
                <span className='glyphicon glyphicon-picture' />
              </div>
            )}
            <span className='link glyphicon glyphicon-plus-sign' onClick={this.handleClickUploadIcon} />
          </span>
        </div>
        <input className='upload-file' name='upload-file' onChange={this.handleChangeFile} ref='file' type='file' />
      </div>
    )
  }
}

AdminAnimeThumbnail.propTypes = {
  title: PropTypes.string.isRequired,
  picture: PropTypes.string,
  handleUpdateThumbnail: PropTypes.func.isRequired,
  handleDeleteThumbnail: PropTypes.func.isRequired
}
